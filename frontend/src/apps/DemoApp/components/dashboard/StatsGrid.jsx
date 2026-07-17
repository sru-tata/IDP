import {
    Flame,
    Star,
    Trophy,
    Target,
    CalendarCheck
} from "lucide-react";

import { useUser } from "../../context/UserContext";
import { useSkillTree } from "../../context/SkillTreeContext";
import { useLearning } from "../../context/LearningContext";

import StatCard from "./StatCard";

function StatsGrid() {

    const { user } = useUser();

    const { careerProgress } = useSkillTree();

    const { weeklyProgress } = useLearning();

    if (

        !user ||

        !careerProgress ||

        !weeklyProgress

    ) {

        return null;

    }

    const xpPercent = Math.min(

        Math.round(

            (user.xp / user.xpToNextLevel) * 100

        ),

        100

    );

    const weeklyGoal = user.weeklyGoal ?? 10;

    const weeklyPercent = Math.min(

        Math.round(

            (weeklyProgress.hoursLearned / weeklyGoal) * 100

        ),

        100

    );

    return (

        <div className="flex h-full flex-col gap-4 justify-between">

            <StatCard

                hero

                title="Career Readiness"

                value={`${careerProgress.readiness}%`}

                subtitle="Progress toward your target role"

                progress={careerProgress.readiness}

                icon={Target}

                color="blue"

            />

            <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-4 auto-rows-fr">

                <StatCard

                    compact

                    title="Level"

                    value={user.currentLevel}

                    subtitle={`${xpPercent}% to next level`}

                    progress={xpPercent}

                    icon={Star}

                    color="yellow"

                />

                <StatCard

                    compact

                    title="Lifetime XP"

                    value={user.xp.toLocaleString()}

                    subtitle={`${user.xpToNextLevel - user.xp} XP remaining`}

                    progress={xpPercent}

                    icon={Trophy}

                    color="purple"

                />

                <StatCard

                    compact

                    title="Learning Streak"

                    value={`${user.streak}`}

                    subtitle="Consecutive days"

                    icon={Flame}

                    color="orange"

                />

                <StatCard

                    compact

                    title="Weekly Goal"

                    value={`${weeklyProgress.hoursLearned}h/${weeklyGoal}h`}

                    subtitle="Hours learned this week"

                    progress={weeklyPercent}

                    icon={CalendarCheck}

                    color="green"

                />

            </div>

        </div>

    );

}

export default StatsGrid;