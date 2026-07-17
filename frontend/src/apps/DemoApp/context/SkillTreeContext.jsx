import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import roleService from "../services/role.service";
import { useUser } from "./UserContext";
import { useLearning } from "./LearningContext";
import { useCompetencies } from "./CompetencyContext";
import { useGrow } from "./GrowContext";

const COMPETENCY_NAME_TO_ID = {

    "Manufacturing": "manufacturing",
    "Quality": "quality",
    "Programming": "programming",
    "Automation": "automation",
    "Artificial Intelligence": "artificial-intelligence"

};

const SkillTreeContext = createContext();

/*
--------------------------------------------------------------------------
Recomputes which nodes are unlocked given the current completed set.
A node unlocks once every one of its prerequisites is completed.
--------------------------------------------------------------------------
*/
function withUnlockedState(nodes) {

    const completedIds = new Set(
        nodes.filter(node => node.completed).map(node => node.id)
    );

    return nodes.map(node => ({

        ...node,

        unlocked:
            node.completed ||
            !node.prerequisites ||
            node.prerequisites.length === 0 ||
            node.prerequisites.every(id => completedIds.has(id)),

        unlocks: nodes
            .filter(other => other.prerequisites?.includes(node.id))
            .map(other => other.title)

    }));

}

function SkillTreeProvider({ children }) {

    const {

        user,

        addXP

    } = useUser();

    const {

        logActivity

    } = useLearning();

    const {

        addContribution

    } = useCompetencies();

    /*
    Experience (Job Rotation) and Exposure (GEMS/event) nodes don't own
    their own completed flag - GrowContext is the single source of truth
    for those (it grants the XP/competency reward), so we just read
    their live status here and derive `completed` from it. This means
    completing a rotation from the Grow hub or from inside a skill tree
    node instantly and correctly reflects everywhere, with no manual
    sync step to get wrong.
    */
    const {

        jobRotations,

        gemsProjects,

        externalEvents,

        openRotationModal,

        openActivityModal

    } = useGrow();

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        rawSkillTree,

        setRawSkillTree

    ] = useState(null);

    /*
    --------------------------------------------------

    Load Skill Tree

    --------------------------------------------------
    */

    useEffect(() => {

        if (!user?.targetRoleId) {

            setRawSkillTree(null);

            setLoading(false);

            return;

        }

        loadSkillTree(

            user.targetRoleId

        );

    }, [

        user?.targetRoleId

    ]);

    async function loadSkillTree(roleId) {

        setLoading(true);

        try {

            const tree = await roleService.getSkillTree(

                roleId

            );

            setRawSkillTree(tree);

        }

        catch (error) {

            console.error(

                "Failed to load skill tree",

                error

            );

            setRawSkillTree(null);

        }

        finally {

            setLoading(false);

        }

    }

    /*
    --------------------------------------------------

    Resolved Skill Tree

    Overlays live Experience/Exposure completion from GrowContext onto
    the raw tree, then recomputes unlock state from the result.

    --------------------------------------------------
    */

    const skillTree = useMemo(() => {

        if (!rawSkillTree) {

            return null;

        }

        const nodes = rawSkillTree.nodes.map(node => {

            if (node.type === "experience") {

                const rotation = jobRotations.find(item => item.id === node.rotationId);

                return { ...node, completed: rotation?.status === "completed" };

            }

            if (node.type === "exposure") {

                const activity = node.activityType === "gems"
                    ? gemsProjects.find(item => item.id === node.activityId)
                    : externalEvents.find(item => item.id === node.activityId);

                return { ...node, completed: activity?.status === "completed" };

            }

            return node;

        });

        return {

            ...rawSkillTree,

            nodes: withUnlockedState(nodes)

        };

    }, [

        rawSkillTree,

        jobRotations,

        gemsProjects,

        externalEvents

    ]);

    /*
    --------------------------------------------------

    Derived Progress

    --------------------------------------------------
    */

    const careerProgress = useMemo(() => {

        if (!skillTree) {

            return null;

        }

        const completedNodes = skillTree.nodes.filter(

            node => node.completed

        );

        const completedXP = completedNodes.reduce(

            (sum, node) => sum + node.xp,

            0

        );

        const totalXP = skillTree.nodes.reduce(

            (sum, node) => sum + node.xp,

            0

        );

        return {

            readiness:

                totalXP

                    ? Math.round(

                        (completedXP / totalXP) * 100

                    )

                    : 0,

            completedCourses:

                completedNodes.length,

            totalCourses:

                skillTree.nodes.length,

            completedXP,

            totalXP,

            estimatedMonths:

                skillTree.estimatedMonths

        };

    }, [

        skillTree

    ]);

    /*
    --------------------------------------------------

    Derived Nodes

    --------------------------------------------------
    */

    const completedNodes = useMemo(() => {

        return skillTree

            ? skillTree.nodes.filter(

                node => node.completed

            )

            : [];

    }, [

        skillTree

    ]);

    const unlockedNodes = useMemo(() => {

        return skillTree

            ? skillTree.nodes.filter(

                node => node.unlocked

            )

            : [];

    }, [

        skillTree

    ]);

    const lockedNodes = useMemo(() => {

        return skillTree

            ? skillTree.nodes.filter(

                node => !node.unlocked

            )

            : [];

    }, [

        skillTree

    ]);

    const nextNode = useMemo(() => {

        return unlockedNodes.find(

            node => !node.completed

        ) || null;

    }, [

        unlockedNodes

    ]);

    /*
    --------------------------------------------------

    Complete an Education Node

    Experience/Exposure nodes are completed via GrowContext instead
    (openRotationModal/openActivityModal below) - their reward and
    completion state both live there.

    --------------------------------------------------
    */

    function completeNode(nodeId) {

        const target = rawSkillTree?.nodes.find(node => node.id === nodeId);

        if (!target || target.completed || target.type !== "education") {

            return;

        }

        setRawSkillTree(previous => ({

            ...previous,

            nodes: previous.nodes.map(node =>

                node.id === nodeId
                    ? { ...node, completed: true }
                    : node

            )

        }));

        addXP?.(target.xp || 0);

        logActivity?.({

            minutes: Math.round((target.durationSeconds || 2700) / 60),
            xp: target.xp || 0,
            courses: 1

        });

        const competencyId = COMPETENCY_NAME_TO_ID[target.competency];

        addContribution?.(

            competencyId,
            Math.max(1, Math.round((target.xp || 0) / 150)),
            "education",
            target.title

        );

    }

    /*
    --------------------------------------------------

    Open the right modal for a given node - course player for
    Education, or the shared Grow modal for Experience/Exposure.

    --------------------------------------------------
    */

    function openNodeAction(node) {

        if (node.type === "experience") {

            openRotationModal(node.rotationId);

        }
        else if (node.type === "exposure") {

            openActivityModal(node.activityId, node.activityType);

        }

    }

    /*
    --------------------------------------------------

    Refresh

    --------------------------------------------------
    */

    async function refreshSkillTree() {

        if (!user?.targetRoleId) {

            return;

        }

        await loadSkillTree(

            user.targetRoleId

        );

    }

    /*
    --------------------------------------------------

    Context

    --------------------------------------------------
    */

    const value = useMemo(() => ({

        loading,

        skillTree,

        careerProgress,

        completedNodes,

        unlockedNodes,

        lockedNodes,

        nextNode,

        refreshSkillTree,

        completeNode,

        openNodeAction

    }), [

        loading,

        skillTree,

        careerProgress,

        completedNodes,

        unlockedNodes,

        lockedNodes,

        nextNode

    ]);

    return (

        <SkillTreeContext.Provider

            value={value}

        >

            {children}

        </SkillTreeContext.Provider>

    );

}

export function useSkillTree() {

    return useContext(

        SkillTreeContext

    );

}

export default SkillTreeProvider;
