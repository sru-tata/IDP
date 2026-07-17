import {
    CalendarDays,
    Clock3,
    Flame,
    Trophy
} from "lucide-react";

import Card from "../ui/Card";
import LearningConsistency from "../gamification/LearningConsistency";

import { useUser } from "../../context/UserContext";
import { useLearning } from "../../context/LearningContext";

function ContributionCard() {

    const { user } = useUser();

    const { weeklyProgress } = useLearning();

    if (!user) {

        return null;

    }

    return (

        <Card>

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">

                        Learning Activity

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        Keep Your Momentum 🔥

                    </h2>

                </div>

                <div className="rounded-2xl bg-blue-500/10 p-3">

                    <CalendarDays

                        size={22}

                        className="text-blue-400"

                    />

                </div>

            </div>

            {/* Activity Strip */}

            <div

                className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-zinc-900
                    px-6
                    py-4
                "

            >

                <div className="flex items-center gap-3">

                    <Flame

                        className="text-orange-400"

                        size={18}

                    />

                    <div>

                        <p className="text-xl font-bold">

                            {user.streak}

                        </p>

                        <p className="text-xs text-zinc-500">

                            Day Streak

                        </p>

                    </div>

                </div>

                <div className="h-10 w-px bg-zinc-800" />

                <div className="flex items-center gap-3">

                    <Trophy

                        className="text-yellow-400"

                        size={18}

                    />

                    <div>

                        <p className="text-xl font-bold">

                            +{weeklyProgress.xpEarned}

                        </p>

                        <p className="text-xs text-zinc-500">

                            XP This Week

                        </p>

                    </div>

                </div>

                <div className="h-10 w-px bg-zinc-800" />

                <div className="flex items-center gap-3">

                    <Clock3

                        className="text-sky-400"

                        size={18}

                    />

                    <div>

                        <p className="text-xl font-bold">

                            {weeklyProgress.hoursLearned}

                        </p>

                        <p className="text-xs text-zinc-500">

                            Hours Learned

                        </p>

                    </div>

                </div>

            </div>

            {/* Heatmap */}

            <div className="mt-6">

                <LearningConsistency compact />

            </div>

        </Card>

    );

}

export default ContributionCard;