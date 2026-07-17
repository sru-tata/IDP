import {
    ArrowRight,
    BookOpen,
    Clock3,
    Trophy,
    Sparkles,
    Youtube,
    Bookmark,
    CheckCircle2
} from "lucide-react";

import clsx from "clsx";

import Card from "../ui/Card";
import Button from "../ui/Button";
import ProgressBar from "../ui/ProgressBar";

import { useCourses } from "../../context/CourseContext";
import { getThumbnailUrl } from "../../utils/youtube";

const categoryColors = {

    Manufacturing: "bg-orange-500/20 text-orange-300",

    Quality: "bg-green-500/20 text-green-300",

    Programming: "bg-blue-500/20 text-blue-300",

    "Artificial Intelligence": "bg-violet-500/20 text-violet-300",

    "Industry 4.0": "bg-cyan-500/20 text-cyan-300",

    Automation: "bg-pink-500/20 text-pink-300"

};

function CourseCard(props) {

    const {

        openCourse,
        isBookmarked

    } = useCourses();

    const {

        highlighted = false

    } = props;

    const bookmarked = isBookmarked?.(props.id);

    const thumbnail = props.videoId ? getThumbnailUrl(props.videoId, "hqdefault") : null;

    return (

        <Card

            onClick={() =>

                openCourse(props)

            }

            className={clsx(

                `
                group
                relative
                flex
                h-[540px]
                w-[400px]
                cursor-pointer
                flex-col
                overflow-hidden
                p-0
                transition-all
                duration-500
                `,

                highlighted

                    ? `
                    z-20
                    scale-[1.08]
                    border-blue-500
                    ring-2
                    ring-blue-400
                    shadow-[0_0_60px_rgba(59,130,246,.35)]
                    `

                    : `
                    hover:-translate-y-2
                    hover:border-blue-500/40
                    hover:shadow-2xl
                    hover:shadow-blue-600/20
                    `

            )}

        >

            {/* YouTube badge */}

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
                    bg-black/70
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    backdrop-blur-lg
                "

            >

                <Youtube size={14} className="text-red-500" />

                YouTube

            </div>

            {
                bookmarked && (

                    <div
                        className="
                            absolute
                            right-5
                            top-16
                            z-20
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-black/70
                            backdrop-blur-lg
                        "
                        title="In your Learning Plan"
                    >
                        <Bookmark size={14} className="fill-blue-400 text-blue-400" />
                    </div>
                )
            }

            <div

                className={`
                    relative
                    flex
                    h-[220px]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-gradient-to-br
                    ${props.color}
                `}

            >

                {
                    thumbnail && (

                        <img
                            src={thumbnail}
                            alt={props.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
                            onError={(event) => {
                                event.currentTarget.style.display = "none";
                            }}
                        />
                    )
                }

                {

                    highlighted && (

                        <div

                            className="
                                absolute
                                bottom-5
                                left-5
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-blue-600
                                px-4
                                py-2
                                text-xs
                                font-semibold
                            "

                        >

                            <Sparkles size={14}/>

                            TOP MATCH

                        </div>

                    )

                }

                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-xl"/>

                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-black/10 blur-lg"/>

                <div className="relative flex h-28 w-28 items-center justify-center text-white transition-all duration-500 group-hover:scale-110">

                    {

                        props.progress === 100 ? (

                            <CheckCircle2 size={64} className="text-white drop-shadow-lg" />

                        ) : (

                            props.icon ||

                            <BookOpen size={72}/>

                        )

                    }

                </div>

                <div

                    className="
                        absolute
                        right-5
                        top-5
                        rounded-full
                        bg-black/40
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                    "

                >

                    {props.difficulty}

                </div>

            </div>

            <div className="flex flex-1 flex-col p-7">

                <span

                    className={`
                        inline-flex
                        w-fit
                        rounded-full
                        px-3
                        py-2
                        text-xs
                        font-medium
                        ${categoryColors[props.category]}
                    `}

                >

                    {props.category}

                </span>

                <h2

                    className="
                        mt-5
                        line-clamp-2
                        text-2xl
                        font-bold
                    "

                >

                    {props.title}

                </h2>

                <p

                    className="
                        mt-3
                        line-clamp-2
                        text-sm
                        text-zinc-500
                    "

                >

                    {

                        props.shortDescription ||

                        "Professional learning experience."

                    }

                </p>

                <div className="mt-5 flex items-center gap-4 text-sm text-zinc-400">

                    <div className="flex items-center gap-2">

                        <Clock3 size={15}/>

                        {props.duration}

                    </div>

                    <div className="flex items-center gap-2">

                        <Trophy size={15}/>

                        {props.xp} XP

                    </div>

                </div>

                {

                    props.started && (

                        <div className="mt-7">

                            <ProgressBar

                                value={props.progress}

                            />

                            <p className="mt-2 text-sm text-zinc-500">

                                {props.progress}% complete

                            </p>

                        </div>

                    )

                }

                <Button

                    onClick={(event) => {

                        event.stopPropagation();

                        openCourse(props);

                    }}

                    className="mt-auto"

                >

                    <div className="flex items-center gap-3">

                        {

                            props.progress === 100
                                ? "Watch Again"
                                : props.started
                                    ? "Continue"
                                    : "Preview Course"

                        }

                        <ArrowRight size={18}/>

                    </div>

                </Button>

            </div>

        </Card>

    );

}

export default CourseCard;
