import {
    BrainCircuit,
    ArrowRight,
    Sparkles,
    TrendingUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import CareerProgressRing from "../gamification/CareerProgressRing";

import { useSkillTree } from "../../context/SkillTreeContext";

function AICoachCard() {

    const navigate = useNavigate();

    const {

        careerProgress,

        nextNode

    } = useSkillTree();

    if (!careerProgress) {

        return null;

    }

    return (

        <Card>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">

                        AI Career Coach

                    </p>

                    <h2 className="mt-2 text-2xl font-bold">

                        Personalized Insights

                    </h2>

                </div>

                <div className="rounded-2xl bg-blue-500/10 p-3">

                    <BrainCircuit

                        className="text-blue-400"

                        size={26}

                    />

                </div>

            </div>

            <div className="mt-8 flex justify-center">

                <CareerProgressRing
                    percentage={careerProgress.readiness}
                />

            </div>

            <div

                className="
                    mt-8
                    rounded-2xl
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    p-5
                "

            >

                <div className="flex items-center gap-2">

                    <Sparkles

                        size={18}

                        className="text-blue-400"

                    />

                    <p className="font-semibold">

                        Today's Insight

                    </p>

                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-400">

                    You're progressing faster than

                    <span className="font-semibold text-white">

                        {" "}68%{" "}

                    </span>

                    of employees targeting this role.

                </p>

                <p className="mt-4 text-sm leading-7 text-zinc-400">

                    Completing

                    <span className="font-semibold text-blue-400">

                        {" "}{nextNode?.title}{" "}

                    </span>

                    is projected to increase your readiness by

                    <span className="font-semibold text-white">

                        {" "}8%

                    </span>

                    and unlock your next career milestone.

                </p>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-4">

                    <div>

                        <p className="text-sm font-medium">

                            Predicted Completion

                        </p>

                        <p className="text-xs text-zinc-500">

                            Based on current pace

                        </p>

                    </div>

                    <span className="font-semibold">

                        {careerProgress.estimatedMonths} Months

                    </span>

                </div>

                <div className="flex items-center justify-between rounded-xl bg-zinc-900 p-4">

                    <div>

                        <p className="text-sm font-medium">

                            Learning Velocity

                        </p>

                        <p className="text-xs text-zinc-500">

                            Compared with peers

                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-emerald-400">

                        <TrendingUp size={18} />

                        <span className="font-semibold">

                            +14%

                        </span>

                    </div>

                </div>

            </div>

            <button

                onClick={() => navigate("/skill-tree")}

                className="
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-2xl
                    bg-blue-600
                    py-4
                    font-semibold
                    transition
                    hover:bg-blue-500
                "

            >

                View AI Learning Plan

                <ArrowRight size={18} />

            </button>

        </Card>

    );

}

export default AICoachCard;