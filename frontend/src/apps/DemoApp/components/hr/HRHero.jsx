import {
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Target,
    BookOpenCheck,
    Activity
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useHR } from "../../context/HRContext";

function StatPill({ icon: Icon, label, value, sublabel }) {

    return (

        <div
            className="
                flex-1
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900/60
                p-5
            "
        >

            <div className="flex items-center gap-2 text-zinc-500">
                <Icon size={15}/>
                <p className="text-xs uppercase tracking-[0.2em]">
                    {label}
                </p>
            </div>

            <p className="mt-3 text-3xl font-bold">
                {value}
            </p>

            {
                sublabel && (
                    <p className="mt-1 text-sm text-zinc-500">
                        {sublabel}
                    </p>
                )
            }

        </div>

    );

}

function HRHero() {

    const { name } = useAuth();

    const { orgStats } = useHR();

    if (!orgStats) {

        return null;

    }

    const momentumUp = orgStats.readinessMomentum >= 0;

    return (

        <div>

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-gradient-to-br
                    from-blue-950
                    via-zinc-950
                    to-zinc-950
                    p-8
                "
            >

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl"/>

                <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    HR / Manager Dashboard
                </p>

                <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                    Welcome back, {name || "HR Admin"}
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-400">
                    Org-wide skill readiness, department gaps and AI-surfaced
                    trends across every team on the Learning Intelligence
                    Platform.
                </p>

                <div
                    className={`
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        ${
                            momentumUp
                                ? "bg-green-500/15 text-green-400"
                                : "bg-red-500/15 text-red-400"
                        }
                    `}
                >

                    {
                        momentumUp
                            ? <ArrowUpRight size={16}/>
                            : <ArrowDownRight size={16}/>
                    }

                    {Math.abs(orgStats.readinessMomentum)}pt readiness change this month

                </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">

                <StatPill
                    icon={Users}
                    label="Total Headcount"
                    value={orgStats.totalHeadcount.toLocaleString()}
                    sublabel="Across 7 departments"
                />

                <StatPill
                    icon={Target}
                    label="Avg Skill Readiness"
                    value={`${orgStats.avgReadiness}%`}
                    sublabel="Weighted by headcount"
                />

                <StatPill
                    icon={Activity}
                    label="Active Learners"
                    value={orgStats.activeLearners.toLocaleString()}
                    sublabel="This month"
                />

                <StatPill
                    icon={BookOpenCheck}
                    label="Courses Completed"
                    value={orgStats.coursesCompletedThisMonth.toLocaleString()}
                    sublabel="This month"
                />

            </div>

        </div>

    );

}

export default HRHero;
