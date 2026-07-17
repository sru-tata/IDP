import {
    BookOpen,
    Briefcase,
    Sparkles,
    TrendingDown,
    TrendingUp
} from "lucide-react";

import Card from "../ui/Card";

import { useCompetencies } from "../../context/CompetencyContext";

const PILLARS = [

    {
        key: "experience",
        label: "Experience",
        sublabel: "Job Rotations",
        icon: Briefcase,
        bar: "bg-amber-500",
        text: "text-amber-400"
    },

    {
        key: "exposure",
        label: "Exposure",
        sublabel: "Side Quests & Events",
        icon: Sparkles,
        bar: "bg-pink-500",
        text: "text-pink-400"
    },

    {
        key: "education",
        label: "Education",
        sublabel: "Courses",
        icon: BookOpen,
        bar: "bg-blue-500",
        text: "text-blue-400"
    }

];

function GapPill({ gap }) {

    if (Math.abs(gap) < 3) {

        return (

            <span className="rounded-full bg-green-500/15 px-2.5 py-1 text-[11px] font-semibold text-green-400">
                On target
            </span>

        );

    }

    const short = gap < 0;

    return (

        <span

            className={`
                flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold
                ${short ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400"}
            `}

        >

            {short ? <TrendingDown size={11}/> : <TrendingUp size={11}/>}
            {Math.abs(gap)}pt {short ? "short" : "over"}

        </span>

    );

}

function EEEMixWidget({ compact = false }) {

    const { eeeMix } = useCompetencies();

    if (!eeeMix) {

        return null;

    }

    return (

        <Card className={compact ? "p-6" : "p-8"}>

            <div className="flex flex-wrap items-center justify-between gap-3">

                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                        Beyond the Classroom
                    </p>
                    <h2 className={compact ? "mt-2 text-lg font-bold" : "mt-2 text-2xl font-bold"}>
                        Your Experience · Exposure · Education Mix
                    </h2>
                </div>

                <div className="text-right">
                    <p className="text-xs text-zinc-500">Target mix</p>
                    <p className="font-semibold text-zinc-300">70 / 20 / 10</p>
                </div>

            </div>

            {

                !eeeMix.hasData && (

                    <p className="mt-2 text-sm text-zinc-500">
                        Starting mix - complete a rotation, side quest or event to see this shift live.
                    </p>

                )

            }

            <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-zinc-800">

                {

                    PILLARS.map(pillar => (

                        <div
                            key={pillar.key}
                            className={pillar.bar}
                            style={{ width: `${eeeMix[pillar.key]}%` }}
                        />

                    ))

                }

            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                {

                    PILLARS.map(pillar => {

                        const Icon = pillar.icon;

                        return (

                            <div key={pillar.key} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

                                <div className="flex items-center justify-between">

                                    <div className={`flex items-center gap-2 ${pillar.text}`}>
                                        <Icon size={15}/>
                                        <span className="text-xs font-semibold uppercase tracking-wider">
                                            {pillar.label}
                                        </span>
                                    </div>

                                    <GapPill gap={eeeMix.gap[pillar.key]}/>

                                </div>

                                <div className="mt-3 flex items-baseline gap-2">
                                    <p className="text-2xl font-bold">
                                        {eeeMix[pillar.key]}%
                                    </p>
                                    <p className="text-xs text-zinc-600">
                                        of {eeeMix.required[pillar.key]}% target
                                    </p>
                                </div>

                                <p className="mt-1 text-xs text-zinc-500">
                                    {pillar.sublabel}
                                </p>

                            </div>

                        );

                    })

                }

            </div>

            <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-200">

                {

                    eeeMix.distanceFromIdeal < 5

                        ? "Your growth mix is right where it should be - keep it up."

                        : `You're ${eeeMix.distanceFromIdeal} points off the ideal 70/20/10 mix - ${
                            eeeMix.gap.experience < 0
                                ? "try a rotation to close the biggest gap."
                                : eeeMix.gap.exposure < 0
                                    ? "join a side quest or event to close the gap."
                                    : "you're leaning on courses more than you need to."
                        }`

                }

            </div>

        </Card>

    );

}

export default EEEMixWidget;
