import {
    Flame,
    Star,
    Trophy,
    Award,
    BookOpen
} from "lucide-react";

import Card from "../ui/Card";
import { useUser } from "../../context/UserContext";

function Stat({

    icon,

    value,

    label,

    color

}) {

    return (

        <div className="flex items-center gap-4">

            <div

                className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    ${color}
                `}
            >

                {icon}

            </div>

            <div>

                <h3 className="text-2xl font-bold">

                    {value}

                </h3>

                <p className="text-sm text-zinc-500">

                    {label}

                </p>

            </div>

        </div>

    );

}

function ProfileStatsStrip() {

    const {

        user

    } = useUser();

    if (!user) {

        return null;

    }

    return (

        <Card className="px-8 py-6">

            <div
                className="
                    grid
                    grid-cols-5
                    gap-6
                "
            >

                <Stat

                    icon={<Star size={22}/>}

                    value={user.currentLevel}

                    label="Level"

                    color="bg-yellow-500/15 text-yellow-400"

                />

                <Stat

                    icon={<Trophy size={22}/>}

                    value={user.xp.toLocaleString()}

                    label="XP"

                    color="bg-blue-500/15 text-blue-400"

                />

                <Stat

                    icon={<Flame size={22}/>}

                    value={user.streak}

                    label="Day Streak"

                    color="bg-orange-500/15 text-orange-400"

                />

                <Stat

                    icon={<Award size={22}/>}

                    value={user.badges.length}

                    label="Badges"

                    color="bg-green-500/15 text-green-400"

                />

                <Stat

                    icon={<BookOpen size={22}/>}

                    value={user.certificates.length}

                    label="Certificates"

                    color="bg-violet-500/15 text-violet-400"

                />

            </div>

        </Card>

    );

}

export default ProfileStatsStrip;