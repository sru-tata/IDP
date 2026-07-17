import {
    Briefcase,
    Building2,
    CheckCircle2,
    Clock3,
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

function JobRotationModal({ rotation, onClose }) {

    const { startRotation, completeRotation } = useGrow();

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if (!rotation) {

            return;

        }

        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => setVisible(true));

        return () => {

            document.body.style.overflow = "";

        };

    }, [rotation]);

    function handleClose() {

        setVisible(false);

        setTimeout(onClose, 180);

    }

    if (!rotation) {

        return null;

    }

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

                <div className="relative bg-gradient-to-br from-amber-600 via-orange-700 to-zinc-950 p-8">

                    <button
                        onClick={handleClose}
                        className="absolute right-5 top-5 rounded-full bg-black/30 p-2 transition hover:bg-black/50"
                    >
                        <X size={18}/>
                    </button>

                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                        <Briefcase size={14}/>
                        Experience · Job Rotation
                    </div>

                    <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                        {rotation.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-amber-100">

                        <span className="flex items-center gap-2">
                            <Building2 size={14}/>
                            {rotation.hostDepartment}
                        </span>

                        <span className="flex items-center gap-2">
                            <Clock3 size={14}/>
                            {rotation.duration}
                        </span>

                        <span className="flex items-center gap-2">
                            <Trophy size={14}/>
                            {rotation.xp} XP
                        </span>

                    </div>

                </div>

                <div className="max-h-[60vh] overflow-y-auto p-8">

                    <p className="leading-7 text-zinc-400">
                        {rotation.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-xs uppercase text-zinc-500">Mentor</p>
                            <p className="mt-1 font-medium">{rotation.mentor}</p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                            <p className="text-xs uppercase text-zinc-500 flex items-center gap-1">
                                <Users size={12}/>
                                Seats Available
                            </p>
                            <p className="mt-1 font-medium">{rotation.seatsAvailable}</p>
                        </div>

                    </div>

                    <div className="mt-6">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            What You'll Do
                        </p>

                        <ul className="space-y-2">

                            {rotation.outcomes.map(outcome => (

                                <li key={outcome} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-amber-400"/>
                                    {outcome}
                                </li>

                            ))}

                        </ul>

                    </div>

                    <div className="mt-6">

                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            Competencies Gained
                        </p>

                        <div className="flex flex-wrap gap-2">

                            {rotation.competenciesGained.map(gain => (

                                <span
                                    key={gain.competencyId}
                                    className="rounded-full bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300"
                                >
                                    +{gain.boost}% {gain.competencyId.replace("-", " ")}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="mt-8">

                        {

                            rotation.status === "completed" ? (

                                <div className="flex items-center justify-center gap-2 rounded-2xl bg-green-500/10 py-4 font-semibold text-green-400">
                                    <CheckCircle2 size={18}/>
                                    Rotation Completed
                                </div>

                            ) : rotation.status === "active" ? (

                                <Button
                                    onClick={() => completeRotation(rotation.id)}
                                    className="w-full justify-center"
                                >
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 size={18}/>
                                        Mark Rotation Complete
                                    </span>
                                </Button>

                            ) : (

                                <Button
                                    onClick={() => startRotation(rotation.id)}
                                    className="w-full justify-center"
                                >
                                    Apply for Rotation
                                </Button>

                            )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default JobRotationModal;
