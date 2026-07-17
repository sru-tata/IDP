import { useState } from "react";

import { useSkillTree } from "../../context/SkillTreeContext";

import SkillTreeFlow from "../../components/skillTree/SkillTreeFlow";
import SkillTreeSidebar from "../../components/skillTree/SkillTreeSidebar";
import CompetencyLegend from "../../components/skillTree/CompetencyLegend";
import CurrentQuest from "../../components/skillTree/CurrentQuest";

function SkillTree() {

    const {

        skillTree,

        careerProgress,

        nextNode

    } = useSkillTree();

    const [

        selectedNode,

        setSelectedNode

    ] = useState(null);

    if (!skillTree || !careerProgress) {

        return null;

    }

    return (

        <div className="mx-auto max-w-[1800px] px-10 py-10">

            {/* Header */}

            <div className="mb-10 flex items-end justify-between">

                <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">

                        Career Path

                    </p>

                    <h1 className="mt-3 text-5xl font-black tracking-tight text-white">

                        {skillTree.title}

                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">

                        Build the skills required for your next role. Complete
                        learning modules, unlock advanced competencies and
                        gradually progress toward your target career.

                    </p>

                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 px-8 py-6">

                    <p className="text-sm text-zinc-500">

                        Career Readiness

                    </p>

                    <div className="mt-3 flex items-end gap-2">

                        <span className="text-5xl font-black text-blue-400">

                            {careerProgress.readiness}

                        </span>

                        <span className="mb-2 text-xl font-semibold">

                            %

                        </span>

                    </div>

                    <div className="mt-5 h-2 w-64 overflow-hidden rounded-full bg-zinc-800">

                        <div

                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"

                            style={{

                                width: `${careerProgress.readiness}%`

                            }}

                        />

                    </div>

                </div>

            </div>

            <div className="mb-10">

                <CurrentQuest node={nextNode} />

            </div>

            {/* Main Layout */}

            <div className="grid grid-cols-[1fr_360px] gap-8">

                {/* Skill Map */}

                <section className="relative overflow-hidden rounded-[36px] border border-zinc-800 bg-[#080B11]">

                    <CompetencyLegend />

                    <SkillTreeFlow

                        selectedNode={selectedNode}

                        onSelectNode={setSelectedNode}

                    />

                </section>

                {/* Right Panel */}

                <aside className="sticky top-24 h-fit">

                    <SkillTreeSidebar

                        node={selectedNode}

                    />

                </aside>

            </div>

        </div>

    );

}

export default SkillTree;