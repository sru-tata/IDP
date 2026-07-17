import {
    BrainCircuit,
    Cpu,
    Factory,
    ShieldCheck,
    Workflow,
    Bot
} from "lucide-react";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

import { useCompetencies } from "../../context/CompetencyContext";

const ICONS = {
    factory: Factory,
    shield: ShieldCheck,
    "shield-check": ShieldCheck,
    cpu: Cpu,
    brain: BrainCircuit,
    "brain-circuit": BrainCircuit,
    bot: Bot,
    workflow: Workflow
};

const COLORS = {
    orange: "text-orange-400",
    green: "text-green-400",
    blue: "text-blue-400",
    violet: "text-violet-400",
    pink: "text-pink-400",
    cyan: "text-cyan-400"
};

function CompetencyOverview() {

    const { competencies } = useCompetencies();

    return (

        <Card className="h-full p-8">

            <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">

                    Competencies

                </p>

                <h2 className="mt-2 text-3xl font-bold">

                    Your Strengths

                </h2>

                <p className="mt-2 text-zinc-500">

                    Competencies developed through your learning journey.

                </p>

            </div>

            <div className="space-y-6">

                {

                    competencies.map(item => {

                        const Icon = ICONS[item.icon] || Factory;
                        const color = COLORS[item.color] || "text-blue-400";

                        return (

                            <div key={item.id}>

                                <div className="mb-3 flex items-center justify-between">

                                    <div className="flex items-center gap-3">

                                        <span className={color}>

                                            <Icon size={18} />

                                        </span>

                                        <span className="font-medium">

                                            {item.name}

                                        </span>

                                    </div>

                                    <span className="font-semibold text-blue-400">

                                        {item.progress}%

                                    </span>

                                </div>

                                <ProgressBar value={item.progress} hideLabel />

                            </div>

                        );

                    })

                }

            </div>

        </Card>

    );

}

export default CompetencyOverview;
