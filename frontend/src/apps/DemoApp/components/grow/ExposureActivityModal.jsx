import {
    Calendar,
    CheckCircle2,
    Layers,
    Sparkles,
    Trophy,
    Users,
    X
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import Button from "../ui/Button";

import { useGrow } from "../../context/GrowContext";

const EVENT_TYPE_LABELS = {

    innovista: "Tata Innovista",
    infuse: "Tata InFuse",
    techday: "Technology Day",
    webinar: "Webinar",
    seminar: "Seminar",
    conference: "Conference"

};

function formatDate(iso) {

    if (!iso) {

        return "";

    }

    return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

}

function ExposureActivityModal({ activity, kind, onClose }) {

    const {

        joinGemsProject,
        completeGemsProject,
        registerForEvent,
        markEventAttended

    } = useGrow();

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if (!activity) {

            return;

        }

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => setVisible(true));

        return () => {

            document.body.style.overflow = "";

        };

    }, [activity]);

    function handleClose() {

        setVisible(false);

        setTimeout(onClose, 180);

    }

    if (!activity) {

        return null;

    }

    const isGems = kind === "gems";

    const joinAction = isGems ? joinGemsProject : registerForEvent;
    const completeAction = isGems ? completeGemsProject : markEventAttended;

    const joinLabel = isGems ? "Join Project" : "Register";
    const activeLabel = isGems ? "Mark Project Complete" : "Mark as Attended";

    return (

        <div
            onClick={handleClose}
            className={`
                fixed inset-0 z-[110] flex items-center justify-center p-6
                backdrop-blur-md transition-all duration-200
                ${visible ? "bg-black/60" : "bg-black/0"}
            `}
        >

            <div
                onClick={event => event.stopPropagation()}
                className={`
                    w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800
                    bg-zinc-950 shadow-2xl transition-all duration-200
                    ${visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"}
                `}
            >

                <div className="relative bg-gradient-to-br from-pink-600 via-fuchsia-700 to-zinc-950 p-8">

                    <button
                        onClick={handleClose}
                        className="absolute right-5 top-5 rounded-full bg-black/30 p-2 transition hover:bg-black/50"
                    >
                        <X size={18}/>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-200">
                        <Sparkles size={14}/>
                        Exposure {isGems ? "· GEMS Project" : `· ${EVENT_TYPE_LABELS[activity.type] || "Event"}`}
                    </div>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                        {activity.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-pink-100">

                        {

                            isGems ? (

                                <>
                                    <span className="flex items-center gap-2">
                                        <Layers size={14}/>
                                        {activity.effort}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Users size={14}/>
                                        {activity.teamSize}
                                    </span>
                                </>

                            ) : (

                                <>
                                    <span className="flex items-center gap-2">
                                        <Calendar size={14}/>
                                        {formatDate(activity.date)}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        {activity.format}
                                    </span>
                                </>

                            )

                        }

                        <span className="flex items-center gap-2">
                            <Trophy size={14}/>
                            {activity.xp} XP
                        </span>

                    </div>

                </div>

                <div className="max-h-[60vh] overflow-y-auto p-8">

                    <p className="leading-7 text-zinc-400">
                        {activity.description}
                    </p>

                    {

                        isGems && activity.deliverable && (

                            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                <p className="text-xs uppercase text-zinc-500">Deliverable</p>
                                <p className="mt-1 text-sm text-zinc-300">{activity.deliverable}</p>
                            </div>

                        )

                    }

                    {

                        !isGems && (

                            <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                                <p className="text-xs uppercase text-zinc-500">Organizer</p>
                                <p className="mt-1 text-sm text-zinc-300">{activity.organizer}</p>
                            </div>

                        )

                    }

                    <div className="mt-6">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            Competencies Gained
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {activity.competenciesGained.map(gain => (

                                <span
                                    key={gain.competencyId}
                                    className="rounded-full bg-pink-500/10 px-3 py-2 text-xs font-medium text-pink-300"
                                >
                                    +{gain.boost}% {gain.competencyId.replace("-", " ")}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="mt-8">

                        {

                            activity.status === "completed" ? (

                                <div className="flex items-center justify-center gap-2 rounded-2xl bg-green-500/10 py-4 font-semibold text-green-400">
                                    <CheckCircle2 size={18}/>
                                    {isGems ? "Project Completed" : "Attended"}
                                </div>

                            ) : activity.status === "active" ? (

                                <Button
                                    onClick={() => completeAction(activity.id)}
                                    className="w-full justify-center"
                                >
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 size={18}/>
                                        {activeLabel}
                                    </span>
                                </Button>

                            ) : (

                                <Button
                                    onClick={() => joinAction(activity.id)}
                                    className="w-full justify-center"
                                >
                                    {joinLabel}
                                </Button>

                            )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ExposureActivityModal;
