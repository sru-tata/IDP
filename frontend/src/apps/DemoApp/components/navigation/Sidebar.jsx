import {
    ArrowRight,
    Flame,
    Target
} from "lucide-react";

import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";
import LevelRing from "../gamification/LevelRing";

import navigation from "../../constants/navigation";

import { useUser } from "../../context/UserContext";
import { useSkillTree } from "../../context/SkillTreeContext";
import { useCourses } from "../../context/CourseContext";

function Sidebar() {

    const {

        user,

        targetRole

    } = useUser();

    const {

        careerProgress

    } = useSkillTree();

    const {

        continueCourses,

        startCourse

    } = useCourses();

    if (

        !user ||

        !careerProgress ||

        !targetRole

    ) {

        return null;

    }

    const currentCourse =

        continueCourses[0];

    return (

        <aside

            className="
                flex
                h-screen
                w-72
                flex-col
                border-r
                border-zinc-800
                bg-zinc-950
            "

        >

            <div className="border-b border-zinc-800 p-6">

                <Logo />

            </div>

            <nav

                className="
                    flex-1
                    space-y-2
                    overflow-y-auto
                    p-4
                "

            >

                {

                    navigation.map(item => (

                        <SidebarItem

                            key={item.id}

                            {...item}

                        />

                    ))

                }

            </nav>

            <div

                className="
                    border-t
                    border-zinc-800
                    p-5
                    space-y-5
                "

            >

                {/* Career */}

                <div>

                    <div className="flex items-center gap-2">

                        <Target

                            size={16}

                            className="text-blue-400"

                        />

                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                            Career Goal

                        </p>

                    </div>

                    <h4 className="mt-3 text-sm font-semibold">

                        {targetRole.title}

                    </h4>

                    <div className="mt-4 h-2 rounded-full bg-zinc-800">

                        <div

                            className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-blue-600
                                to-cyan-500
                            "

                            style={{

                                width:

                                    `${careerProgress.readiness}%`

                            }}

                        />

                    </div>

                    <p className="mt-2 text-xs text-zinc-500">

                        {careerProgress.readiness}% Career Ready

                    </p>

                </div>

                {/* Continue Learning */}

                {

                    currentCourse && (

                        <div

                            className="
                                rounded-xl
                                border
                                border-zinc-800
                                bg-zinc-900
                                p-4
                            "

                        >

                            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">

                                Continue

                            </p>

                            <h4 className="mt-2 text-sm font-semibold">

                                {currentCourse.title}

                            </h4>

                            <div className="mt-4 h-2 rounded-full bg-zinc-800">

                                <div

                                    className="
                                        h-full
                                        rounded-full
                                        bg-blue-500
                                    "

                                    style={{

                                        width:

                                            `${currentCourse.progress}%`

                                    }}

                                />

                            </div>

                            <button

                                onClick={() => startCourse(currentCourse)}

                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    text-blue-400
                                    transition
                                    hover:text-blue-300
                                "

                            >

                                Resume

                                <ArrowRight

                                    size={15}

                                />

                            </button>

                        </div>

                    )

                }

                {/* Footer Stats */}

                <div className="flex justify-between">

                    <div className="text-center">

                        <Flame

                            size={18}

                            className="mx-auto text-orange-500"

                        />

                        <p className="mt-2 text-xs">

                            {user.streak} Days

                        </p>

                    </div>

                    <div className="text-center">

                        <LevelRing size={36} strokeWidth={3}/>

                        <p className="mt-2 text-xs text-zinc-500">

                            {user.xp}/{user.xpToNextLevel} XP

                        </p>

                    </div>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;