import {
    X,
    ExternalLink,
    CheckCircle2,
    Trophy,
    Eye,
    Youtube
} from "lucide-react";

import clsx from "clsx";

import {
    useEffect,
    useState
} from "react";

import Button from "../ui/Button";

import { useCourses } from "../../context/CourseContext";
import { useSkillTree } from "../../context/SkillTreeContext";

import {
    getEmbedUrl,
    getWatchUrl,
    formatViewCount,
    formatPublishedAgo
} from "../../utils/youtube";

import { getVideoById } from "../../mock/youtubeVideos";

function VideoPlayerModal() {

    const {

        playingCourse,

        closePlayer,

        markCourseComplete

    } = useCourses();

    const {

        completeNode

    } = useSkillTree();

    function handleMarkComplete() {

        if (playingCourse.source === "skill-node") {

            completeNode(playingCourse.nodeId);

        }
        else {

            markCourseComplete(playingCourse);

        }

        handleClose();

    }

    const [

        visible,

        setVisible

    ] = useState(false);

    useEffect(() => {

        if (!playingCourse) {

            return;

        }

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => setVisible(true));

        function handleEscape(event) {

            if (event.key === "Escape") {

                handleClose();

            }

        }

        window.addEventListener("keydown", handleEscape);

        return () => {

            document.body.style.overflow = "";

            window.removeEventListener("keydown", handleEscape);

        };

    }, [playingCourse]);

    function handleClose() {

        setVisible(false);

        setTimeout(() => closePlayer(), 180);

    }

    if (!playingCourse) {

        return null;

    }

    const video = getVideoById(playingCourse.videoId);
    const isComplete = playingCourse.progress === 100;

    return (

        <div

            onClick={handleClose}

            className={clsx(

                `
                fixed
                inset-0
                z-[110]
                flex
                items-center
                justify-center
                p-4
                backdrop-blur-md
                transition-all
                duration-200
                sm:p-6
                `,

                visible ? "bg-black/70" : "bg-black/0"

            )}

        >

            <div

                onClick={event => event.stopPropagation()}

                className={clsx(

                    `
                    w-full
                    max-w-4xl
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
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-6 scale-95 opacity-0"

                )}

            >

                <div className="relative aspect-video w-full bg-black">

                    {

                        playingCourse.videoId ? (

                            <iframe
                                title={playingCourse.title}
                                src={getEmbedUrl(playingCourse.videoId, { autoplay: true })}
                                className="h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />

                        ) : (

                            <div className="flex h-full w-full items-center justify-center text-zinc-600">
                                Video unavailable
                            </div>

                        )

                    }

                    <button

                        onClick={handleClose}

                        className="
                            absolute
                            right-4
                            top-4
                            z-20
                            rounded-full
                            bg-black/60
                            p-2
                            transition
                            hover:bg-black/80
                        "

                    >

                        <X size={18}/>

                    </button>

                </div>

                <div className="p-6 sm:p-8">

                    <div className="flex flex-wrap items-start justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">

                                <Youtube size={14}/>

                                {video?.channel || playingCourse.channelTitle}

                            </div>

                            <h2 className="mt-2 text-2xl font-bold">

                                {playingCourse.title}

                            </h2>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-zinc-500">

                                {

                                    video?.views && (

                                        <div className="flex items-center gap-2">
                                            <Eye size={14}/>
                                            {formatViewCount(video.views)}
                                        </div>

                                    )

                                }

                                {

                                    video?.publishedAt && (

                                        <span>
                                            Published {formatPublishedAgo(video.publishedAt)}
                                        </span>

                                    )

                                }

                                <div className="flex items-center gap-2">
                                    <Trophy size={14}/>
                                    {playingCourse.xp} XP
                                </div>

                            </div>

                        </div>

                        {

                            isComplete && (

                                <span className="flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">
                                    <CheckCircle2 size={16}/>
                                    Completed
                                </span>

                            )

                        }

                    </div>

                    <p className="mt-5 leading-7 text-zinc-400">

                        {playingCourse.description || playingCourse.shortDescription}

                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        {
                            !isComplete && (

                                <Button

                                    onClick={handleMarkComplete}

                                    className="flex-1 justify-center"

                                >

                                    <span className="flex items-center justify-center gap-2">
                                        <CheckCircle2 size={18}/>
                                        Mark as Complete
                                    </span>

                                </Button>

                            )
                        }

                        <a

                            href={getWatchUrl(playingCourse.videoId)}
                            target="_blank"
                            rel="noreferrer"
                            className={clsx(
                                isComplete ? "flex-1" : "flex-1 sm:flex-none"
                            )}

                        >

                            <Button

                                variant="secondary"

                                className="w-full justify-center"

                            >

                                <span className="flex items-center justify-center gap-2">
                                    <ExternalLink size={18}/>
                                    Watch on YouTube
                                </span>

                            </Button>

                        </a>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default VideoPlayerModal;
