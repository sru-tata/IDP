import {
    ArrowRight,
    Sparkles,
    Clock3,
    BriefcaseBusiness,
    CheckCircle2,
    TrendingUp
} from "lucide-react";

import { useUser } from "../../context/UserContext";
import { useSkillTree } from "../../context/SkillTreeContext";

import TargetRoleSelector from "./TargetRoleSelector";

function DashboardHero() {

    const {

        user,

        targetRole

    } = useUser();

    const {

        careerProgress

    } = useSkillTree();

    if (

        !user ||

        !careerProgress ||

        !targetRole

    ) {

        return null;

    }

    const xpRemaining = Math.max(

        0,

        user.xpToNextLevel - user.xp

    );

    return (

        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-8
            "
        >

            <div
                className="
                    absolute
                    -right-32
                    -top-32
                    h-96
                    w-96
                    rounded-full
                    bg-blue-600/10
                    blur-[150px]
                "
            />

            <div className="grid grid-cols-12 gap-8 items-center">

                <div className="col-span-7">

                    <div className="flex items-center gap-2 text-blue-400">

                        <Sparkles size={18} />

                        <span className="text-sm font-semibold">

                            Career Hub

                        </span>

                    </div>

                    <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-500">

                        Welcome back

                    </p>

                    <h1 className="mt-2 text-5xl font-black">

                        {user.name.split(" ")[0]}

                    </h1>

                    <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">

                        Continue building the skills required to become

                        <span className="font-semibold text-white">

                            {" "}{targetRole.title}

                        </span>

                        .

                    </p>

                    <div className="mt-8 flex items-center gap-4">

                        <div className="rounded-2xl bg-zinc-800 px-6 py-4">

                            <p className="text-xs uppercase text-zinc-500">

                                Current Role

                            </p>

                            <h3 className="mt-2 text-lg font-semibold">

                                {user.currentRole}

                            </h3>

                        </div>

                        <ArrowRight className="text-blue-400" />

                        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 px-6 py-4">

                            <p className="text-xs uppercase text-blue-300">

                                Target Role

                            </p>

                            <h3 className="mt-2 text-lg font-semibold">

                                {targetRole.title}

                            </h3>

                        </div>

                    </div>

                    <div className="mt-8 max-w-sm">

                        <TargetRoleSelector />

                    </div>

                </div>

                <div className="col-span-5">

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">

                        <div className="flex items-center gap-3">

                            <BriefcaseBusiness className="text-blue-400" />

                            <h3 className="text-xl font-bold">

                                Career Snapshot

                            </h3>

                        </div>

                        <div className="mt-8 space-y-6">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <CheckCircle2 className="text-emerald-400" size={20} />

                                    <span className="text-zinc-400">

                                        Skills Completed

                                    </span>

                                </div>

                                <span className="font-semibold">

                                    {careerProgress.completedCourses}/

                                    {careerProgress.totalCourses}

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <Clock3 className="text-blue-400" size={20} />

                                    <span className="text-zinc-400">

                                        Estimated Completion

                                    </span>

                                </div>

                                <span className="font-semibold">

                                    {careerProgress.estimatedMonths} Months

                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <TrendingUp className="text-yellow-400" size={20} />

                                    <span className="text-zinc-400">

                                        XP to Next Level

                                    </span>

                                </div>

                                <span className="font-semibold">

                                    {xpRemaining.toLocaleString()} XP

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default DashboardHero;