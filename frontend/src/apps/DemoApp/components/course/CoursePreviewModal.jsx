import {
    X,
    Play,
    Plus,
    Check,
    Clock3,
    Trophy,
    Sparkles,
    Youtube,
    CheckCircle2
} from "lucide-react";

import clsx from "clsx";

import {
    useEffect,
    useState
} from "react";

import Button from "../ui/Button";

import { useCourses } from "../../context/CourseContext";
import { getThumbnailUrl } from "../../utils/youtube";

function Chip({ children }) {

    return (

        <span
            className="
                rounded-full
                bg-zinc-800
                px-3
                py-2
                text-xs
                font-medium
            "
        >
            {children}
        </span>

    );

}

function CoursePreviewModal({

    course,

    featuredReason = [],

    onClose

}) {

    const {

        startCourse,

        toggleBookmark,

        isBookmarked

    } = useCourses();

    const [

        visible,

        setVisible

    ] = useState(false);

    useEffect(() => {

        if (!course) {

            return;

        }

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {

            setVisible(true);

        });

        function handleEscape(event) {

            if (

                event.key === "Escape"

            ) {

                closeModal();

            }

        }

        window.addEventListener(

            "keydown",

            handleEscape

        );

        return () => {

            document.body.style.overflow = "";

            window.removeEventListener(

                "keydown",

                handleEscape

            );

        };

    }, [

        course

    ]);

    function closeModal() {

        setVisible(false);

        setTimeout(() => {

            onClose();

        }, 180);

    }

    if (!course) {

        return null;

    }

    const bookmarked = isBookmarked?.(course.id);
    const isComplete = course.progress === 100;
    const thumbnail = course.videoId ? getThumbnailUrl(course.videoId, "maxresdefault") : null;

    function handlePlay() {

        startCourse(course);

        closeModal();

    }

    return (

        <div

            onClick={closeModal}

            className={clsx(

                `
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                p-6
                backdrop-blur-md
                transition-all
                duration-200
                `,

                visible

                    ? "bg-black/55"

                    : "bg-black/0"

            )}

        >

            <div

                onClick={

                    event =>

                    event.stopPropagation()

                }

                className={clsx(

                    `
                    w-full
                    max-w-2xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    shadow-2xl
                    transition-all
                    duration-200
                    `,

                    visible

                        ? `
                        translate-y-0
                        scale-100
                        opacity-100
                        `

                        : `
                        translate-y-6
                        scale-95
                        opacity-0
                        `

                )}

            >

                {/* Hero */}

                <button

                    onClick={handlePlay}

                    className={`
                        group
                        relative
                        flex
                        h-56
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        bg-gradient-to-br
                        ${course.color}
                        text-left
                    `}

                >

                    {

                        thumbnail && (

                            <img
                                src={thumbnail}
                                alt={course.title}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-overlay"
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                            />

                        )

                    }

                    <div

                        onClick={(event) => {
                            event.stopPropagation();
                            closeModal();
                        }}

                        className="
                            absolute
                            right-5
                            top-5
                            z-20
                            rounded-full
                            bg-black/40
                            p-2
                            transition
                            hover:bg-black/60
                        "

                    >

                        <X size={18}/>

                    </div>

                    <div
                        className="
                            absolute
                            left-5
                            top-5
                            z-20
                            flex
                            items-center
                            gap-2
                            rounded-full
                            bg-black/60
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            backdrop-blur-lg
                        "
                    >
                        <Youtube size={14} className="text-red-500"/>
                        YouTube
                    </div>

                    <div

                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/20
                            opacity-0
                            transition-opacity
                            duration-200
                            group-hover:opacity-100
                        "

                    >

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-xl transition-transform group-hover:scale-110">

                            <Play size={26} fill="black" className="ml-1"/>

                        </div>

                    </div>

                    <div

                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-zinc-950
                            via-transparent
                            to-transparent
                        "

                    />

                    <div

                        className="
                            absolute
                            bottom-8
                            left-8
                            right-8
                        "

                    >

                        {

                            course.recommended && (

                                <div className="flex items-center gap-2">

                                    <Sparkles

                                        size={15}

                                    />

                                    <span

                                        className="
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-[0.3em]
                                        "

                                    >

                                        Recommended

                                    </span>

                                </div>

                            )

                        }

                        <h1

                            className="
                                mt-3
                                text-3xl
                                font-black
                                sm:text-4xl
                            "

                        >

                            {course.title}

                        </h1>

                        <div

                            className="
                                mt-4
                                flex
                                flex-wrap
                                gap-6
                                text-sm
                            "

                        >

                            <div className="flex items-center gap-2">

                                <Clock3 size={15}/>

                                {course.duration}

                            </div>

                            <div className="flex items-center gap-2">

                                <Trophy size={15}/>

                                {course.xp} XP

                            </div>

                            <div>

                                ⭐ {course.rating || 4.8}

                            </div>

                        </div>

                    </div>

                </button>

                                {/* Body */}

                <div className="p-8">

                    <p

                        className="
                            leading-7
                            text-zinc-400
                        "

                    >

                        {

                            course.shortDescription ||

                            course.description ||

                            "Professional learning experience powered by YouTube."

                        }

                    </p>

                    {/* Skills */}

                    {

                        course.skills?.length > 0 && (

                            <div className="mt-8">

                                <p

                                    className="
                                        mb-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.3em]
                                        text-zinc-500
                                    "

                                >

                                    Skills

                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {

                                        course.skills.slice(0, 5).map(skill => (

                                            <Chip

                                                key={skill}

                                            >

                                                {skill}

                                            </Chip>

                                        ))

                                    }

                                </div>

                            </div>

                        )

                    }

                    {/* Recommended */}

                    {

                        featuredReason.length > 0 && (

                            <div className="mt-8">

                                <p

                                    className="
                                        mb-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-[0.3em]
                                        text-zinc-500
                                    "

                                >

                                    Recommended Because

                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {

                                        featuredReason.map(reason => (

                                            <Chip

                                                key={reason}

                                            >

                                                {reason}

                                            </Chip>

                                        ))

                                    }

                                </div>

                            </div>

                        )

                    }

                    {/* Buttons */}

                    <div className="mt-10 flex gap-4">

                        <Button

                            onClick={handlePlay}

                            className="
                                flex-1
                                justify-center
                            "

                        >

                            <span
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                {

                                    isComplete ? (

                                        <CheckCircle2 size={18}/>

                                    ) : (

                                        <Play size={18}/>

                                    )

                                }

                                <span>

                                    {

                                        isComplete
                                            ? "Watch Again"
                                            : course.started
                                                ? "Continue Learning"
                                                : "Start Learning"

                                    }

                                </span>

                            </span>

                        </Button>

                        <Button

                            variant="secondary"

                            onClick={() => toggleBookmark(course)}

                            className="
                                flex-1
                                justify-center
                            "

                        >

                            <span
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                "
                            >

                                {

                                    bookmarked ? (

                                        <Check size={18}/>

                                    ) : (

                                        <Plus size={18}/>

                                    )

                                }

                                <span>

                                    {

                                        bookmarked
                                            ? "In Learning Plan"
                                            : "Learning Plan"

                                    }

                                </span>

                            </span>

                        </Button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CoursePreviewModal;
