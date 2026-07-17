import {
    Lock,
    Zap,
    Factory,
    Flame,
    BrainCircuit,
    ShieldCheck,
    ChevronRight,
    X,
    CheckCircle2
} from "lucide-react";

import { useState } from "react";

import Card from "../ui/Card";
import { useUser } from "../../context/UserContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";

import "swiper/css";

const BADGE_ICONS = {
    "fast-learner": Zap,
    "lean-explorer": Factory,
    "streak-7": Flame,
    "ai-explorer": BrainCircuit,
    "quality-master": ShieldCheck
};

const ALL_BADGES = [
    {
        id: "fast-learner",
        title: "Fast Learner",
        description: "Completed 3 courses in a single week."
    },
    {
        id: "lean-explorer",
        title: "Lean Explorer",
        description: "Finished every Lean Manufacturing course in the catalog."
    },
    {
        id: "streak-7",
        title: "7 Day Streak",
        description: "Learned something new for 7 days in a row."
    },
    {
        id: "ai-explorer",
        title: "AI Explorer",
        description: "Started your first Artificial Intelligence course."
    },
    {
        id: "quality-master",
        title: "Quality Master",
        description: "Reached 80% or higher in the Quality competency."
    }
];

function Badge({

    earned,

    title,

    Icon,

    onClick

}) {

    return (

        <button
            onClick={onClick}
            className="
                flex
                h-[110px]
                w-full
                flex-col
                items-center
                justify-start
                pt-3
            "
        >

            <div

                className={`
                    relative
                    flex
                    h-14
                    w-14
                    rotate-45
                    items-center
                    justify-center
                    rounded-xl
                    border
                    transition-all
                    duration-300
                    ${
                        earned
                            ? "border-yellow-500 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 shadow-lg shadow-yellow-500/20 hover:scale-105"
                            : "border-zinc-800 bg-zinc-900 opacity-40"
                    }
                `}

            >

                <div className="-rotate-45">

                    {

                        earned

                            ? <Icon size={18} className="text-yellow-300"/>

                            : <Lock size={14} className="text-zinc-600"/>

                    }

                </div>

            </div>

            <p
                className="
                    mt-5
                    px-1
                    text-center
                    text-[11px]
                    leading-4
                    text-zinc-400
                "
            >

                {title}

            </p>

        </button>

    );

}

function BadgesModal({ unlocked, onClose }) {

    return (

        <div

            onClick={onClose}

            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/60
                p-6
                backdrop-blur-md
            "

        >

            <div

                onClick={event => event.stopPropagation()}

                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-8
                    shadow-2xl
                "

            >

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        All Badges
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full bg-zinc-900 p-2 transition hover:bg-zinc-800"
                    >
                        <X size={16}/>
                    </button>

                </div>

                <div className="mt-6 space-y-3">

                    {

                        ALL_BADGES.map(badge => {

                            const Icon = BADGE_ICONS[badge.id];
                            const earned = unlocked.includes(badge.id);

                            return (

                                <div
                                    key={badge.id}
                                    className={`
                                        flex
                                        items-start
                                        gap-4
                                        rounded-2xl
                                        border
                                        p-4
                                        ${
                                            earned
                                                ? "border-yellow-500/30 bg-yellow-500/5"
                                                : "border-zinc-800 bg-zinc-900"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            ${
                                                earned
                                                    ? "bg-yellow-500/20 text-yellow-300"
                                                    : "bg-zinc-800 text-zinc-600"
                                            }
                                        `}
                                    >

                                        {

                                            earned
                                                ? <Icon size={18}/>
                                                : <Lock size={16}/>

                                        }

                                    </div>

                                    <div className="flex-1">

                                        <div className="flex items-center gap-2">

                                            <p className="font-semibold">
                                                {badge.title}
                                            </p>

                                            {
                                                earned && (
                                                    <CheckCircle2 size={14} className="text-yellow-400"/>
                                                )
                                            }

                                        </div>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            {badge.description}
                                        </p>

                                    </div>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>

    );

}

function BadgesCard({

    title = "Badge Collection",

    subtitle = "Achievements"

}) {

    const { user } = useUser();

    const [

        modalOpen,

        setModalOpen

    ] = useState(false);

    if (!user) {

        return (

            <Card className="h-full flex items-center justify-center">

                <p className="text-zinc-500">

                    Loading achievements...

                </p>

            </Card>

        );

    }

    const unlocked = (user.badges ?? []).map(

        badge => badge.id

    );

    return (

        <Card className="h-full">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">

                        {subtitle}

                    </p>

                    <h2 className="mt-2 text-xl font-bold">

                        {title}

                    </h2>

                </div>

                <button
                    onClick={() => setModalOpen(true)}
                    className="
                        flex
                        items-center
                        gap-1
                        text-sm
                        font-medium
                        text-blue-400
                        transition
                        hover:text-blue-300
                    "
                >

                    View All

                    <ChevronRight size={16}/>

                </button>

            </div>

            <div className="mt-5 px-2 py-2">

                <Swiper

                    modules={[Mousewheel]}

                    mousewheel={{

                        forceToAxis: true

                    }}

                    spaceBetween={8}

                    slidesPerView={3}

                    breakpoints={{

                        768: {

                            slidesPerView: 3

                        },

                        1024: {

                            slidesPerView: 3.2

                        },

                        1440: {

                            slidesPerView: 3.5

                        }

                    }}

                >

                    {

                        ALL_BADGES.map(badge => {

                            const Icon = BADGE_ICONS[badge.id];

                            return (

                                <SwiperSlide key={badge.id}>

                                    <Badge

                                        earned={

                                            unlocked.includes(

                                                badge.id

                                            )

                                        }

                                        title={badge.title}

                                        Icon={Icon}

                                        onClick={() => setModalOpen(true)}

                                    />

                                </SwiperSlide>

                            );

                        })

                    }

                </Swiper>

            </div>

            {

                modalOpen && (

                    <BadgesModal

                        unlocked={unlocked}

                        onClose={() => setModalOpen(false)}

                    />

                )

            }

        </Card>

    );

}

export default BadgesCard;
