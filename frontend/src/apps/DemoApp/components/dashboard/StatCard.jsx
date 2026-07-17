import clsx from "clsx";

const COLORS = {

    blue: {
        icon: "text-blue-400",
        progress: "bg-blue-500"
    },

    yellow: {
        icon: "text-yellow-400",
        progress: "bg-yellow-500"
    },

    purple: {
        icon: "text-violet-400",
        progress: "bg-violet-500"
    },

    orange: {
        icon: "text-orange-400",
        progress: "bg-orange-500"
    },

    green: {
        icon: "text-emerald-400",
        progress: "bg-emerald-500"
    }

};

function StatCard({

    hero = false,

    compact = false,

    title,

    value,

    subtitle,

    icon: Icon,

    color,

    progress

}) {

    const style = COLORS[color];

    return (

        <div

            className={clsx(

                "rounded-3xl",
                "border",
                "border-zinc-800",
                "bg-zinc-900",
                "transition-all",
                "duration-300",
                "hover:-translate-y-1",
                "hover:border-zinc-700",

                hero

                    ? "p-7"

                    : "h-full px-5 py-4"

            )}

        >

            <div

                className={clsx(

                    "flex h-full flex-col",

                    hero

                        ? ""

                        : "justify-between"

                )}

            >

                <div className="flex items-start justify-between">

                    <div className="min-w-0">

                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">

                            {title}

                        </p>

                        <h2

                            className={clsx(

                                "mt-2 font-black leading-none",

                                hero

                                    ? "text-5xl"

                                    : "text-2xl"

                            )}

                        >

                            {value}

                        </h2>

                    </div>

                    <div

                        className={clsx(

                            "rounded-2xl bg-zinc-800",

                            hero

                                ? "p-4"

                                : "p-3"

                        )}

                    >

                        <Icon

                            size={

                                hero

                                    ? 28

                                    : 18

                            }

                            className={style.icon}

                        />

                    </div>

                </div>

                {

                    subtitle && (

                        <p

                            className={clsx(

                                "text-zinc-500",

                                hero

                                    ? "mt-4 text-sm"

                                    : "mt-3 text-xs leading-5"

                            )}

                        >

                            {subtitle}

                        </p>

                    )

                }

                {

                    progress !== undefined && (

                        <div

                            className={clsx(

                                hero

                                    ? "mt-5"

                                    : "mt-4"

                            )}

                        >

                            <div className="h-2 rounded-full bg-zinc-800">

                                <div

                                    className={clsx(

                                        "h-full rounded-full transition-all",

                                        style.progress

                                    )}

                                    style={{

                                        width: `${progress}%`

                                    }}

                                />

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default StatCard;