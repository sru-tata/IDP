import {
    Crown,
    ChevronUp,
    ChevronDown,
    Minus,
    Medal
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import Card from "../ui/Card";

import { useUser } from "../../context/UserContext";

import leaderboardService from "../../services/leaderboard.service";

function TrendIcon({ trend }) {

    if (trend === "up") {

        return <ChevronUp size={15} className="text-emerald-400" />;

    }

    if (trend === "down") {

        return <ChevronDown size={15} className="text-red-400" />;

    }

    return <Minus size={15} className="text-zinc-500" />;

}

function LeaderboardCard() {

    const { user } = useUser();

    const [

        leaderboard,

        setLeaderboard

    ] = useState([]);

    useEffect(() => {

        if (!user) {

            return;

        }

        leaderboardService

            .getWeeklyLeaderboard(user)

            .then(setLeaderboard);

    }, [user]);

    const currentUser = leaderboard.find(
        player => player.name === "You"
    );

    const nextRank = currentUser
        ? leaderboard.find(player => player.rank === currentUser.rank - 1)
        : null;

    const xpDifference = nextRank && currentUser
        ? nextRank.xp - currentUser.xp + 1
        : 0;

    return (

        <Card className="h-full">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">

                        Competition

                    </p>

                    <h2 className="mt-2 text-xl font-bold">

                        Weekly Leaderboard

                    </h2>

                </div>

                <Crown

                    size={24}

                    className="text-yellow-400"

                />

            </div>

            <div className="mt-5 space-y-2">

                {

                    leaderboard.slice(0, 4).map(player => (

                        <div

                            key={player.id}

                            className={`
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                px-4
                                py-2.5
                                transition

                                ${
                                    player.name === "You"

                                    ? "border border-blue-500/30 bg-blue-600/10"

                                    : "bg-zinc-900"

                                }
                            `}

                        >

                            <div className="flex items-center gap-3">

                                {

                                    player.rank <= 3

                                    ?

                                    <Medal

                                        size={18}

                                        className={
                                            player.rank === 1
                                                ? "text-yellow-400"
                                                : player.rank === 2
                                                ? "text-zinc-300"
                                                : "text-orange-400"
                                        }

                                    />

                                    :

                                    <span className="w-[18px]" />

                                }

                                <div>

                                    <p className="font-medium">

                                        {player.name}

                                    </p>

                                    <p className="text-xs text-zinc-500">

                                        Rank #{player.rank}

                                    </p>

                                </div>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold">

                                    {player.xp.toLocaleString()}

                                </p>

                                <div className="mt-1 flex justify-end">

                                    <TrendIcon trend={player.trend} />

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

            {

                nextRank && (

                    <div

                        className="
                            mt-5
                            rounded-2xl
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            p-4
                        "

                    >

                        <p className="text-sm text-blue-300">

                            <span className="font-semibold">

                                {xpDifference.toLocaleString()} XP

                            </span>

                            {" "}needed to overtake

                            <span className="font-semibold text-white">

                                {" "}{nextRank.name}

                            </span>

                        </p>

                    </div>

                )

            }

        </Card>

    );

}

export default LeaderboardCard;
