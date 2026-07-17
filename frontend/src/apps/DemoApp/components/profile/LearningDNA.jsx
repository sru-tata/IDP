import {
    BrainCircuit,
    Clock3,
    Sparkles,
    Target,
    TrendingUp
} from "lucide-react";

import Card from "../ui/Card";

import { useUser } from "../../context/UserContext";
import { useCompetencies } from "../../context/CompetencyContext";
import { useSkillTree } from "../../context/SkillTreeContext";

function LearningDNA() {

    const { user } = useUser();

    const { strengths } = useCompetencies();

    const { nextNode } = useSkillTree();

    if (!user) {

        return null;

    }

    const insights = [

        {
            id: "format",
            icon: <BrainCircuit size={16}/>,
            title: `${user.preferredLearningFormat} Learner`
        },

        strengths?.[0] && {
            id: "strength",
            icon: <TrendingUp size={16}/>,
            title: `${strengths[0].name} is your strongest competency`
        },

        {
            id: "time",
            icon: <Clock3 size={16}/>,
            title: `Most active during the ${user.preferredLearningTime?.toLowerCase()}`
        },

        nextNode && {
            id: "next",
            icon: <Target size={16}/>,
            title: `Recommended next: ${nextNode.title}`
        }

    ].filter(Boolean);

    return (

        <Card className="h-full p-6">

            <div className="flex items-center gap-2">

                <Sparkles
                    size={18}
                    className="text-blue-400"
                />

                <p className="font-semibold text-blue-400">

                    AI Learning Insights

                </p>

            </div>

            <p className="mt-2 text-sm text-zinc-500">

                Personalized insights based on your learning activity.

            </p>

            <div className="mt-6 space-y-3">

                {

                    insights.map(item => (

                        <div

                            key={item.id}

                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                bg-zinc-900
                                px-4
                                py-3
                            "

                        >

                            <div className="text-blue-400">

                                {item.icon}

                            </div>

                            <p className="text-sm">

                                {item.title}

                            </p>

                        </div>

                    ))

                }

            </div>

        </Card>

    );

}

export default LearningDNA;
