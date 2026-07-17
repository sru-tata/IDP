import {
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock3,
    PlayCircle,
    Sparkles,
    Trophy
} from "lucide-react";

import Card from "../ui/Card";

const KIND_META = {

    rotation: {
        icon: Briefcase,
        color: "from-amber-500 to-orange-600",
        badge: "bg-amber-500/15 text-amber-300",
        label: "Experience"
    },

    gems: {
        icon: Sparkles,
        color: "from-pink-500 to-fuchsia-600",
        badge: "bg-pink-500/15 text-pink-300",
        label: "Exposure"
    },

    event: {
        icon: Sparkles,
        color: "from-violet-500 to-purple-600",
        badge: "bg-violet-500/15 text-violet-300",
        label: "Exposure"
    }

};

const STATUS_META = {

    available: null,

    active: { icon: PlayCircle, label: "In Progress", color: "text-blue-400" },

    completed: { icon: CheckCircle2, label: "Completed", color: "text-green-400" }

};

function formatDate(iso) {

    if (!iso) {

        return "";

    }

    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

}

function GrowCard({ item, kind, onClick }) {

    const meta = KIND_META[kind];
    const Icon = meta.icon;

    const status = STATUS_META[item.status];
    const StatusIcon = status?.icon;

    return (

        <Card

            onClick={onClick}

            className="
                flex
                h-[400px]
                w-[300px]
                shrink-0
                cursor-pointer
                flex-col
                p-0
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
            "

        >

            <div className={`relative flex h-28 shrink-0 items-center justify-center bg-gradient-to-br ${meta.color}`}>

                <Icon size={34} className="text-white/90"/>

                <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${meta.badge} bg-black/30`}>
                    {meta.label}
                </span>

                {

                    status && (

                        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold">
                            <StatusIcon size={12} className={status.color}/>
                            {status.label}
                        </span>

                    )

                }

            </div>

            <div className="flex flex-1 flex-col p-6">

                <h3 className="line-clamp-2 text-lg font-bold leading-snug">
                    {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                    {item.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">

                    {

                        kind === "rotation" && (

                            <span className="flex items-center gap-1.5">
                                <Clock3 size={12}/>
                                {item.duration}
                            </span>

                        )

                    }

                    {

                        kind === "gems" && (

                            <span className="flex items-center gap-1.5">
                                <Clock3 size={12}/>
                                {item.effort}
                            </span>

                        )

                    }

                    {

                        kind === "event" && (

                            <span className="flex items-center gap-1.5">
                                <Calendar size={12}/>
                                {formatDate(item.date)}
                            </span>

                        )

                    }

                    <span className="flex items-center gap-1.5">
                        <Trophy size={12}/>
                        {item.xp} XP
                    </span>

                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">

                    {

                        item.competenciesGained.slice(0, 2).map(gain => (

                            <span key={gain.competencyId} className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-400">
                                +{gain.boost}% {gain.competencyId.replace("-", " ")}
                            </span>

                        ))

                    }

                </div>

            </div>

        </Card>

    );

}

export default GrowCard;
