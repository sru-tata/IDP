import {
    Flame,
    Star,
    Trophy,
    Target
} from "lucide-react";

import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

import { useLearning } from "../../context/LearningContext";
import { useUser } from "../../context/UserContext";

function WeeklyProgressCard() {

    const {

        weeklyProgress

    } = useLearning();

    const {

        user

    } = useUser();

    if (!user) {

        return null;

    }

    const weeklyGoal = user.weeklyGoal ?? 10;

    const progress = Math.min(

        100,

        Math.round(

            (weeklyProgress.hoursLearned / weeklyGoal) * 100

        )

    );

    return (

        <Card className="h-full">

            <h2 className="text-2xl font-bold">

                Weekly Progress

            </h2>

            <p className="mt-2 text-zinc-400">

                Keep your learning momentum going.

            </p>

            <div className="mt-8 space-y-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Flame className="text-orange-500" />

                        <span>Learning Streak</span>

                    </div>

                    <span className="font-bold">

                        {user.streak} Days

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Star className="text-yellow-400" />

                        <span>XP This Week</span>

                    </div>

                    <span className="font-bold">

                        {weeklyProgress.xpEarned}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Trophy className="text-green-500" />

                        <span>Courses Completed</span>

                    </div>

                    <span className="font-bold">

                        {weeklyProgress.coursesCompleted}

                    </span>

                </div>

            </div>

            <div className="mt-10">

                <div className="mb-3 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <Target size={18} />

                        Weekly Goal

                    </div>

                    <span className="text-sm text-zinc-400">

                        {weeklyProgress.hoursLearned.toFixed(1)} / {weeklyGoal} hrs

                    </span>

                </div>

                <ProgressBar

                    value={progress}

                />

            </div>

        </Card>

    );

}

export default WeeklyProgressCard;