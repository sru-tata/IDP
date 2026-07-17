import {
    ArrowRight,
    GitBranchPlus,
    Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";
import CareerProgressRing from "../gamification/CareerProgressRing";

import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CourseContext";

function HeroBanner() {

    const navigate = useNavigate();

    const {

        user,

        targetRole

    } = useUser();

    const {

        continueCourses = [],

        featuredCourse,

        startCourse

    } = useCourses();

    function handleContinueLearning() {

        const nextCourse = continueCourses[0] || featuredCourse;

        if (nextCourse) {

            startCourse(nextCourse);

        }
        else {

            navigate("/explore");

        }

    }

    if (!user) {

        return null;

    }

    return (

        <section
            className="
                relative
                mb-14
                overflow-hidden
                rounded-[32px]
                border
                border-zinc-800
                bg-gradient-to-br
                from-slate-900
                via-zinc-900
                to-blue-950
                px-10
                py-12
            "
        >

            <div
                className="
                    absolute
                    -right-24
                    -top-24
                    h-80
                    w-80
                    rounded-full
                    bg-blue-600/20
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-500/10
                    blur-3xl
                "
            />

            <div className="relative z-10 flex items-center justify-between gap-12">

                <div className="max-w-3xl">

                    <div
                        className="
                            mb-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-blue-500/40
                            bg-blue-500/10
                            px-4
                            py-2
                            text-sm
                            text-blue-300
                        "
                    >

                        <Sparkles size={16} />

                        Personalized Learning Journey

                    </div>

                    <h1
                        className="
                            text-6xl
                            font-black
                            leading-tight
                            tracking-tight
                        "
                    >

                        Become a

                        <span className="block text-blue-400">

                            {targetRole?.title ?? "Future Leader"}

                        </span>

                    </h1>

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-lg
                            leading-8
                            text-zinc-300
                        "
                    >

                        You're currently a{" "}

                        <span className="font-semibold text-white">

                            {user.currentRole}

                        </span>

                        {" "}in{" "}

                        <span className="font-semibold text-white">

                            {user.department}

                        </span>

                        . Continue building the competencies needed for your next role.

                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">

                        <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">

                            🔥 {user.streak} Day Streak

                        </div>

                        <div className="rounded-full bg-zinc-800 px-4 py-2 text-sm">

                            📚 {user.completedCourses} Course{user.completedCourses !== 1 ? "s" : ""} Completed

                        </div>

                    </div>

                    <div className="mt-10 flex gap-4">

                        <Button
                            onClick={handleContinueLearning}
                            className="flex items-center gap-2"
                        >

                            {continueCourses[0] ? "Continue Learning" : "Start Learning"}

                            <ArrowRight size={18} />

                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => navigate("/skill-tree")}
                            className="flex items-center gap-2"
                        >

                            <GitBranchPlus size={18} />

                            View Skill Tree

                        </Button>

                    </div>

                </div>

                <div className="hidden lg:flex flex-col items-center">

                    <CareerProgressRing />

                </div>

            </div>

        </section>

    );

}

export default HeroBanner;