import clsx from "clsx";

import {
    Check,
    Lock,
    Factory,
    ShieldCheck,
    Code2,
    Cpu,
    BrainCircuit,
    Play,
    Briefcase,
    Sparkles
} from "lucide-react";

import {
    Handle,
    Position
} from "reactflow";

const competencyIcons = {

    Manufacturing: Factory,

    Quality: ShieldCheck,

    Programming: Code2,

    Automation: Cpu,

    "Artificial Intelligence": BrainCircuit

};

const competencyStyles = {

    Manufacturing: {
        border: "border-orange-500",
        bg: "from-orange-500 to-red-500",
        glow: "shadow-orange-500/40"
    },

    Quality: {
        border: "border-emerald-500",
        bg: "from-emerald-500 to-green-500",
        glow: "shadow-emerald-500/40"
    },

    Programming: {
        border: "border-sky-500",
        bg: "from-sky-500 to-blue-600",
        glow: "shadow-sky-500/40"
    },

    Automation: {
        border: "border-fuchsia-500",
        bg: "from-fuchsia-500 to-purple-600",
        glow: "shadow-fuchsia-500/40"
    },

    "Artificial Intelligence": {
        border: "border-violet-500",
        bg: "from-violet-500 to-indigo-600",
        glow: "shadow-violet-500/40"
    }

};

const TYPE_BADGES = {

    education: { icon: Play, bg: "bg-blue-500", label: "Education" },

    experience: { icon: Briefcase, bg: "bg-amber-500", label: "Experience · Job Rotation" },

    exposure: { icon: Sparkles, bg: "bg-pink-500", label: "Exposure" }

};

function CourseSkillNode({

    data

}) {

    const Icon = competencyIcons[data.competency];

    const style = competencyStyles[data.competency];

    const typeBadge = TYPE_BADGES[data.type] || TYPE_BADGES.education;

    const TypeIcon = typeBadge.icon;

    return (

        <>

            <Handle
                id="bottom"
                type="target"
                position={Position.Bottom}
                className="!opacity-0"
            />

            <div className="group relative flex flex-col items-center">

                {/* Quest Ring */}

                {

                    data.isQuest &&
                    !data.completed && (

                        <div
                            className="
                                absolute
                                h-14
                                w-14
                                rounded-full
                                border
                                border-blue-400/50
                                animate-pulse
                            "
                        />

                    )

                }

                {/* Crystal */}

                <div

                    className={clsx(

                        `
                        relative
                        flex
                        h-12
                        w-12
                        cursor-pointer
                        items-center
                        justify-center
                        rotate-45
                        rounded-lg
                        border-2
                        bg-zinc-900
                        transition-all
                        duration-300
                        `,

                        style.border,

                        style.glow,

                        data.unlocked &&
                            "hover:scale-125 hover:shadow-xl",

                        data.selected &&
                            "scale-125 shadow-2xl",

                        !data.unlocked &&
                            "opacity-40"

                    )}

                >

                    <div

                        className={clsx(

                            `
                            absolute
                            inset-[3px]
                            rounded-md
                            bg-gradient-to-br
                            `,

                            data.completed

                                ? "from-yellow-300 to-yellow-500"

                                : style.bg

                        )}

                    />

                    <div

                        className="
                            absolute
                            inset-[7px]
                            rounded
                            bg-[#090B11]
                        "

                    />

                    <div
                        className="
                            relative
                            z-20
                            -rotate-45
                        "
                    >

                        {

                            data.completed ?

                                <Check
                                    size={14}
                                    className="text-yellow-300"
                                />

                            :

                            !data.unlocked ?

                                <Lock
                                    size={13}
                                    className="text-zinc-500"
                                />

                            :

                                <Icon
                                    size={13}
                                    className="text-white"
                                />

                        }

                    </div>

                </div>

                {/* Type Badge */}

                <div

                    title={typeBadge.label}

                    className={clsx(

                        `
                        absolute
                        -bottom-1
                        -right-1
                        z-30
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[#090B11]
                        `,

                        typeBadge.bg,

                        !data.unlocked && "opacity-40"

                    )}

                >

                    <TypeIcon size={10} className="text-white" />

                </div>


                {/* Floating Tooltip */}

                <div

                    className="
                        pointer-events-none
                        absolute
                        bottom-20
                        z-50
                        w-48
                        rounded-xl
                        border
                        border-zinc-700
                        bg-zinc-900/95
                        p-3
                        opacity-0
                        shadow-2xl
                        backdrop-blur-xl
                        transition-all
                        duration-200
                        group-hover:-translate-y-2
                        group-hover:opacity-100
                    "

                >

                    <h4 className="text-sm font-semibold">

                        {data.title}

                    </h4>

                    <p className="mt-1 text-xs text-zinc-500">

                        {data.competency}

                    </p>

                    <div className="mt-3 flex justify-between text-xs">

                        <span>

                            {data.duration || typeBadge.label}

                        </span>

                        <span className="text-blue-400">

                            +{data.xp} XP

                        </span>

                    </div>

                </div>

            </div>

            <Handle
                id="top"
                type="source"
                position={Position.Top}
                className="!opacity-0"
            />

        </>

    );

}

export default CourseSkillNode;