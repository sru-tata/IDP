import {
    BookOpen,
    Clock3,
    Youtube,
    Target
} from "lucide-react";

import Card from "../ui/Card";
import { useUser } from "../../context/UserContext";

function Preference({

    icon,

    label,

    value

}) {

    return (

        <div
            className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-5
            "
        >

            <div className="flex items-center gap-4">

                <div className="text-blue-400">

                    {icon}

                </div>

                <div>

                    <p className="text-xs uppercase tracking-wider text-zinc-500">

                        {label}

                    </p>

                    <p className="mt-1 font-medium">

                        {value}

                    </p>

                </div>

            </div>

        </div>

    );

}

function LearningPreferencesCard() {

    const { user } = useUser();

    if (!user) {

        return null;

    }

    return (

        <Card className="h-full p-8">

            <p className="font-semibold text-blue-400">

                Learning Preferences

            </p>

            <h2 className="mt-2 text-3xl font-bold">

                How You Like To Learn

            </h2>

            <p className="mt-3 text-zinc-500">

                These preferences help personalize your recommendations.

            </p>

            <div className="mt-8 space-y-4">

                <Preference

                    icon={<Youtube size={18}/>}

                    label="Provider"

                    value={user.preferredProvider}

                />

                <Preference

                    icon={<Target size={18}/>}

                    label="Weekly Goal"

                    value={`${user.weeklyGoal} hrs / week`}

                />

                <Preference

                    icon={<BookOpen size={18}/>}

                    label="Learning Format"

                    value={user.preferredLearningFormat}

                />

                <Preference

                    icon={<Clock3 size={18}/>}

                    label="Preferred Time"

                    value={user.preferredLearningTime}

                />

            </div>

        </Card>

    );

}

export default LearningPreferencesCard;