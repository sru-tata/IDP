import {
    Award,
    BookOpen,
    Briefcase,
    Clock3,
    Lock,
    Sparkles,
    Target
} from "lucide-react";

import { useCourses } from "../../context/CourseContext";
import { useSkillTree } from "../../context/SkillTreeContext";

function nodeToPlayable(node) {

    return {

        id: node.id,
        title: node.title,
        videoId: node.videoId,
        xp: node.xp,
        duration: node.duration,
        progress: node.completed ? 100 : 0,
        description: node.description,
        shortDescription: node.description,
        channelTitle: node.channelTitle,
        color: "from-blue-600 to-cyan-600",
        source: "skill-node",
        nodeId: node.id

    };

}

const TYPE_LABELS = {

    education: "Education · Course",
    experience: "Experience · Job Rotation",
    exposure: "Exposure"

};

function SkillTreeSidebar({ node }) {

    const { startCourse } = useCourses();

    const { openNodeAction } = useSkillTree();

    if (!node) {

        return (

            <div
                className="
                    sticky
                    top-24
                    rounded-[32px]
                    border
                    border-zinc-800
                    bg-zinc-900
                    p-8
                "
            >

                <div className="flex justify-center">

                    <div
                        className="
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            rounded-3xl
                            border
                            border-dashed
                            border-zinc-700
                        "
                    >

                        <Target
                            size={36}
                            className="text-zinc-600"
                        />

                    </div>

                </div>

                <h2 className="mt-8 text-center text-2xl font-bold">

                    Select a Skill

                </h2>

                <p className="mt-4 text-center leading-7 text-zinc-400">

                    Click any crystal in the learning map to
                    view its description, XP reward,
                    duration and unlocked skills. Amber and
                    pink crystals are Experience (job
                    rotations) and Exposure (GEMS projects &
                    events).

                </p>

            </div>

        );

    }

    const isEducation = node.type === "education" || !node.type;
    const isExperience = node.type === "experience";
    const isExposure = node.type === "exposure";

    function handleAction() {

        if (!node.unlocked) {

            return;

        }

        if (isEducation) {

            startCourse(nodeToPlayable(node));

        }
        else {

            openNodeAction(node);

        }

    }

    return (

        <div
            className="
                sticky
                top-24
                rounded-[32px]
                border
                border-zinc-800
                bg-zinc-900
                overflow-hidden
            "
        >

            {/* Hero */}

            <div
                className={`
                    bg-gradient-to-br
                    p-8
                    ${
                        isExperience
                            ? "from-amber-600 via-orange-700 to-zinc-900"
                            : isExposure
                                ? "from-pink-600 via-fuchsia-700 to-zinc-900"
                                : "from-blue-600 via-blue-700 to-cyan-700"
                    }
                `}
            >

                <div className="flex items-center gap-2">

                    <span
                        className="
                            rounded-full
                            bg-white/15
                            px-4
                            py-2
                            text-xs
                            uppercase
                            tracking-widest
                        "
                    >

                        {node.level}

                    </span>

                    <span
                        className="
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-black/25
                            px-3
                            py-2
                            text-xs
                            font-medium
                        "
                    >

                        {isExperience && <Briefcase size={12}/>}
                        {isExposure && <Sparkles size={12}/>}

                        {TYPE_LABELS[node.type] || TYPE_LABELS.education}

                    </span>

                </div>

                <h2
                    className="
                        mt-6
                        text-3xl
                        font-black
                    "
                >

                    {node.title}

                </h2>

                <p
                    className="
                        mt-2
                        text-blue-100
                    "
                >

                    {node.competency}

                </p>

            </div>

            <div className="space-y-8 p-8">

                {/* Stats */}

                <div className="grid grid-cols-2 gap-4">

                    <Card
                        icon={<Award size={18}/>}
                        label="XP"
                        value={`+${node.xp}`}
                    />

                    <Card
                        icon={<Clock3 size={18}/>}
                        label={isExperience ? "Duration" : "Type"}
                        value={node.duration || TYPE_LABELS[node.type]}
                    />

                    <Card
                        icon={<BookOpen size={18}/>}
                        label="Level"
                        value={node.level}
                    />

                    <Card
                        icon={<Target size={18}/>}
                        label="Status"
                        value={
                            node.completed
                                ? "Completed"
                                : node.unlocked
                                    ? "Available"
                                    : "Locked"
                        }
                    />

                </div>

                {/* Skills */}

                {

                    node.skills && node.skills.length > 0 && (

                        <section>

                            <h3
                                className="
                                    mb-5
                                    flex
                                    items-center
                                    gap-2
                                    text-lg
                                    font-bold
                                "
                            >

                                <Sparkles
                                    size={18}
                                    className="text-blue-400"
                                />

                                Skills You'll Gain

                            </h3>

                            <div className="space-y-3">

                                {

                                    node.skills.map(skill => (

                                        <div

                                            key={skill}

                                            className="
                                                rounded-2xl
                                                bg-zinc-800
                                                px-5
                                                py-4
                                            "

                                        >

                                            {skill}

                                        </div>

                                    ))

                                }

                            </div>

                        </section>

                    )

                }

                {/* Unlock */}

                {

                    node.unlocks && node.unlocks.length > 0 && (

                        <section>

                            <h3 className="mb-5 text-lg font-bold">

                                Unlocks

                            </h3>

                            <div className="space-y-3">

                                {

                                    node.unlocks.map(item => (

                                        <div

                                            key={item}

                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-2xl
                                                bg-zinc-800
                                                px-5
                                                py-4
                                            "

                                        >

                                            <Lock
                                                size={18}
                                            />

                                            {item}

                                        </div>

                                    ))

                                }

                            </div>

                        </section>

                    )

                }

                <button
                    disabled={!node.unlocked}
                    onClick={handleAction}
                    className="
                        w-full
                        rounded-2xl
                        bg-blue-600
                        py-4
                        font-semibold
                        transition
                        hover:bg-blue-500
                        disabled:cursor-not-allowed
                        disabled:bg-zinc-800
                        disabled:text-zinc-600
                        disabled:hover:bg-zinc-800
                    "
                >

                    {

                        node.completed

                            ? "Review"

                            : node.unlocked

                                ? (isEducation ? "Start Learning" : "View Details")

                                : "Locked"

                    }

                </button>

            </div>

        </div>

    );

}

function Card({

    icon,

    label,

    value

}) {

    return (

        <div
            className="
                rounded-2xl
                bg-zinc-800
                p-5
            "
        >

            <div className="text-blue-400">

                {icon}

            </div>

            <p className="mt-4 text-sm text-zinc-500">

                {label}

            </p>

            <h3 className="mt-2 font-semibold">

                {value}

            </h3>

        </div>

    );

}

export default SkillTreeSidebar;
