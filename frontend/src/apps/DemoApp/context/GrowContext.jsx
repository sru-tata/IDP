import {
    createContext,
    useContext,
    useMemo,
    useState
} from "react";

import jobRotations from "../mock/jobRotations";
import gemsProjects from "../mock/gemsProjects";
import externalEvents from "../mock/externalEvents";

import { useUser } from "./UserContext";
import { useLearning } from "./LearningContext";
import { useCompetencies } from "./CompetencyContext";

const GrowContext = createContext();

/*
--------------------------------------------------------------------------
GrowContext

Owns the "Experience" and "Exposure" pillars of Education / Experience /
Exposure - Job Rotations, GEMS stretch projects, and external platform
exposure (Tata Innovista, Tata InFuse, seminars, webinars, conferences,
Technology Day). These are browsable independently of any single role's
skill tree (see pages/Grow) as well as appearing as nodes inside skill
trees - either way, completing one awards XP and moves the real
competency needle via CompetencyContext.addContribution.
--------------------------------------------------------------------------
*/
function GrowProvider({ children }) {

    const { addXP, addActivity } = useUser();
    const { logActivity } = useLearning();
    const { addContribution } = useCompetencies();

    /*
    Status per item: "available" -> "active" -> "completed".
    Rotations go through an "active" step (you're actually on
    placement); GEMS/events go straight to "completed" once you mark
    participation, since they're lighter-weight.
    */
    const [rotationStatus, setRotationStatus] = useState({});
    const [gemsStatus, setGemsStatus] = useState({});
    const [eventStatus, setEventStatus] = useState({});

    /*
    Which rotation/GEMS project/event is currently open in a modal -
    rendered once, globally, in MainLayout (same pattern as
    CoursePreviewModal/VideoPlayerModal) so it always sits above every
    other UI layer regardless of which page or component opened it.
    */
    const [openRotationId, setOpenRotationId] = useState(null);
    const [openActivity, setOpenActivityState] = useState(null); // { id, kind: "gems" | "event" }

    function statusOf(map, id) {

        return map[id] || "available";

    }

    function awardContribution(item, pillar) {

        item.competenciesGained?.forEach(gain => {

            addContribution?.(gain.competencyId, gain.boost, pillar, item.title);

        });

        addXP?.(item.xp || 0);

        addActivity?.({

            type: pillar === "experience" ? "rotation_completed" : "exposure_completed",
            title: `Completed "${item.title}"`,
            xp: item.xp || 0

        });

        logActivity?.({

            minutes: pillar === "experience" ? 240 : 60,
            xp: item.xp || 0,
            courses: 1

        });

    }

    /*
    --------------------------------------------------
    Job Rotations (Experience)
    --------------------------------------------------
    */

    function startRotation(rotationId) {

        setRotationStatus(previous => ({ ...previous, [rotationId]: "active" }));

    }

    function completeRotation(rotationId) {

        const rotation = jobRotations.find(item => item.id === rotationId);

        if (!rotation || statusOf(rotationStatus, rotationId) === "completed") {

            return;

        }

        setRotationStatus(previous => ({ ...previous, [rotationId]: "completed" }));

        awardContribution(rotation, "experience");

    }

    /*
    --------------------------------------------------
    GEMS Projects (Exposure)
    --------------------------------------------------
    */

    function joinGemsProject(projectId) {

        setGemsStatus(previous => ({ ...previous, [projectId]: "active" }));

    }

    function completeGemsProject(projectId) {

        const project = gemsProjects.find(item => item.id === projectId);

        if (!project || statusOf(gemsStatus, projectId) === "completed") {

            return;

        }

        setGemsStatus(previous => ({ ...previous, [projectId]: "completed" }));

        awardContribution(project, "exposure");

    }

    /*
    --------------------------------------------------
    External Events (Exposure)
    --------------------------------------------------
    */

    function registerForEvent(eventId) {

        setEventStatus(previous => ({ ...previous, [eventId]: "active" }));

    }

    function markEventAttended(eventId) {

        const event = externalEvents.find(item => item.id === eventId);

        if (!event || statusOf(eventStatus, eventId) === "completed") {

            return;

        }

        setEventStatus(previous => ({ ...previous, [eventId]: "completed" }));

        awardContribution(event, "exposure");

    }

    /*
    --------------------------------------------------
    Derived
    --------------------------------------------------
    */

    const rotationsWithStatus = useMemo(() =>

        jobRotations.map(rotation => ({
            ...rotation,
            status: statusOf(rotationStatus, rotation.id)
        })),

    [rotationStatus]);

    const gemsWithStatus = useMemo(() =>

        gemsProjects.map(project => ({
            ...project,
            status: statusOf(gemsStatus, project.id)
        })),

    [gemsStatus]);

    const eventsWithStatus = useMemo(() =>

        externalEvents.map(event => ({
            ...event,
            status: statusOf(eventStatus, event.id)
        })),

    [eventStatus]);

    const growSummary = useMemo(() => {

        const activeRotations = rotationsWithStatus.filter(r => r.status === "active").length;
        const completedRotations = rotationsWithStatus.filter(r => r.status === "completed").length;
        const completedGems = gemsWithStatus.filter(g => g.status === "completed").length;
        const attendedEvents = eventsWithStatus.filter(e => e.status === "completed").length;

        return {
            activeRotations,
            completedRotations,
            completedGems,
            attendedEvents,
            totalExperience: completedRotations,
            totalExposure: completedGems + attendedEvents
        };

    }, [rotationsWithStatus, gemsWithStatus, eventsWithStatus]);

    /*
    --------------------------------------------------
    Modal open/close (global)
    --------------------------------------------------
    */

    function openRotationModal(rotationId) {

        setOpenActivityState(null);
        setOpenRotationId(rotationId);

    }

    function openActivityModal(activityId, kind) {

        setOpenRotationId(null);
        setOpenActivityState({ id: activityId, kind });

    }

    function closeGrowModal() {

        setOpenRotationId(null);
        setOpenActivityState(null);

    }

    const selectedRotation = openRotationId
        ? rotationsWithStatus.find(item => item.id === openRotationId)
        : null;

    const selectedActivity = openActivity
        ? (
            openActivity.kind === "gems"
                ? gemsWithStatus.find(item => item.id === openActivity.id)
                : eventsWithStatus.find(item => item.id === openActivity.id)
        )
        : null;

    const value = useMemo(() => ({

        jobRotations: rotationsWithStatus,
        gemsProjects: gemsWithStatus,
        externalEvents: eventsWithStatus,

        growSummary,

        startRotation,
        completeRotation,

        joinGemsProject,
        completeGemsProject,

        registerForEvent,
        markEventAttended,

        selectedRotation,
        selectedActivity,
        selectedActivityKind: openActivity?.kind ?? null,
        openRotationModal,
        openActivityModal,
        closeGrowModal

    }), [

        rotationsWithStatus,
        gemsWithStatus,
        eventsWithStatus,
        growSummary,
        selectedRotation,
        selectedActivity,
        openActivity

    ]);

    return (

        <GrowContext.Provider value={value}>

            {children}

        </GrowContext.Provider>

    );

}

export function useGrow() {

    return useContext(GrowContext);

}

export default GrowProvider;
