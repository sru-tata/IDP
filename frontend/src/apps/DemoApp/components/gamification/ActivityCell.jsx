import clsx from "clsx";

const COLORS = [

    "bg-zinc-800",

    "bg-green-950",

    "bg-green-900",

    "bg-green-700",

    "bg-green-600",

    "bg-green-500"

];

function ActivityCell({

    day,

    compact = false

}) {

    return (

        <button

            title={

                day.level === 0

                    ? "No learning"

                    : `${day.minutes} mins • ${day.courses} courses • +${day.xp} XP`

            }

            className={clsx(

                compact

                    ? "h-[11px] w-[11px] rounded-[3px]"

                    : "h-[15px] w-[15px] rounded-[4px]",

                COLORS[day.level],

                "transition-all duration-200",

                compact

                    ? "hover:scale-150"

                    : "hover:scale-125",

                "hover:ring-2 hover:ring-blue-400"

            )}

        />

    );

}

export default ActivityCell;