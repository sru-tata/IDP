import { useMemo } from "react";

import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import { useSkillTree } from "../../context/SkillTreeContext";
import { buildSkillTreeLayout } from "../../utils/skillTreeLayout";

import CourseSkillNode from "./CourseSkillNode";
import EnergyEdge from "./EnergyEdge";
import LevelBands from "./LevelBands";

const nodeTypes = {
    course: CourseSkillNode
};

const edgeTypes = {
    energy: EnergyEdge
};

function SkillTreeFlow({

    selectedNode,

    onSelectNode

}) {

    const {

        skillTree,

        nextNode

    } = useSkillTree();

    const layout = useMemo(() => {

        if (!skillTree) return [];

        return buildSkillTreeLayout(
            skillTree.nodes
        );

    }, [skillTree]);

    const nodes = useMemo(() => {

        return layout.map(node => ({

            id: node.id,

            type: "course",

            draggable: false,

            selectable: false,

            position: node.position,

            data: {

                ...node,

                selected:
                    selectedNode?.id === node.id,

                isQuest:
                    nextNode?.id === node.id

            }

        }));

    }, [

        layout,

        selectedNode,

        nextNode

    ]);

const edges = useMemo(() => {

    if (!layout.length) {

        return [];

    }

    return layout.flatMap(node =>

        node.prerequisites.map(parentId => {

            const parent = layout.find(

                n => n.id === parentId

            );

            return {

                id: `${parentId}-${node.id}`,

                source: parentId,

                target: node.id,

                type: "energy",

                sourceHandle: "top",

                targetHandle: "bottom",

                data: {

                    completed:

                        parent?.completed

                }

            };

        })

    );

}, [layout]);

    if (!skillTree) {

        return null;

    }

    return (

        <div className="relative h-[760px] overflow-hidden">

            {/* Background */}

            <div className="absolute inset-0">

                {/* Main Glow */}

                <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[170px]" />

                <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[150px]" />

                <div className="absolute left-0 top-0 h-[250px] w-[250px] rounded-full bg-indigo-500/5 blur-[120px]" />

                {/* Vignette */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,.45)_100%)]" />

                <LevelBands />

            </div>

            {/* Summit Marker */}

            <ReactFlow

                key={skillTree.id}

                nodes={nodes}

                edges={edges}

                nodeTypes={nodeTypes}

                edgeTypes={edgeTypes}

                fitView

                fitViewOptions={{

                    padding: 0.25,

                    minZoom: 0.5,

                    maxZoom: 1.1

                }}

                minZoom={0.4}

                maxZoom={1.2}

                panOnDrag

                zoomOnScroll

                zoomOnPinch

                zoomOnDoubleClick={false}

                nodesDraggable={false}

                nodesConnectable={false}

                elementsSelectable={false}

                proOptions={{

                    hideAttribution: true

                }}

                onNodeClick={(_, node) =>

                    onSelectNode(node.data)

                }

            />

        </div>

    );

}

export default SkillTreeFlow;