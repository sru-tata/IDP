import {
    ArrowRight,
    Target,
    Zap
} from "lucide-react";

import { useUser } from "../../context/UserContext";
import { useSkillTree } from "../../context/SkillTreeContext";

function CareerProgressRing({

    size = 240

}) {

    const {

        user,

        targetRole

    } = useUser();

    const {

        careerProgress,

        nextNode

    } = useSkillTree();

    if (

        !user ||

        !targetRole ||

        !careerProgress

    ) {

        return null;

    }

    const stroke = 12;

    const radius = (size - stroke) / 2;

    const circumference = 2 * Math.PI * radius;

    const progress = careerProgress.readiness;

    const offset =

        circumference -

        (progress / 100) * circumference;

    const xpRemaining = Math.max(

        0,

        user.xpToNextLevel - user.xp

    );

    return (

        <div className="flex flex-col items-center">

            <div

                className="relative"

                style={{

                    width: size,

                    height: size

                }}

            >

                <svg

                    width={size}

                    height={size}

                >

                    <defs>

                        <linearGradient

                            id="careerGradient"

                            x1="0"

                            y1="0"

                            x2="1"

                            y2="1"

                        >

                            <stop

                                offset="0%"

                                stopColor="#3B82F6"

                            />

                            <stop

                                offset="100%"

                                stopColor="#06B6D4"

                            />

                        </linearGradient>

                    </defs>

                    <g

                        transform={`rotate(-90 ${size / 2} ${size / 2})`}

                    >

                        <circle

                            cx={size / 2}

                            cy={size / 2}

                            r={radius}

                            fill="none"

                            stroke="#27272A"

                            strokeWidth={stroke}

                        />

                        <circle

                            cx={size / 2}

                            cy={size / 2}

                            r={radius}

                            fill="none"

                            stroke="url(#careerGradient)"

                            strokeWidth={stroke}

                            strokeLinecap="round"

                            strokeDasharray={`${circumference} ${circumference}`}

                            strokeDashoffset={offset}

                            style={{

                                transition:

                                    "stroke-dashoffset 0.8s ease"

                            }}

                        />

                    </g>

                </svg>

                <div

                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                    "

                >

                    <Target

                        size={20}

                        className="text-blue-400"

                    />

                    <h1 className="mt-2 text-5xl font-black">

                        {progress}%

                    </h1>

                    <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">

                        Career Ready

                    </p>

                </div>

            </div>

            <div className="mt-8 w-full text-center">

                <p className="text-sm text-zinc-500">

                    Current Role

                </p>

                <h3 className="mt-1 text-lg font-semibold">

                    {user.currentRole}

                </h3>

                <div className="my-3 flex items-center justify-center gap-2 text-blue-400">

                    <ArrowRight size={16} />

                </div>

                <h2 className="text-xl font-bold">

                    {targetRole.title}

                </h2>

                <p className="mt-2 text-sm text-zinc-500">

                    {xpRemaining.toLocaleString()} XP to Level {user.currentLevel + 1}

                </p>

                {

                    nextNode && (

                        <div

                            className="
                                mt-8
                                rounded-2xl
                                border
                                border-blue-500/20
                                bg-blue-500/10
                                p-4
                                text-left
                            "

                        >

                            <div className="flex items-center gap-2">

                                <Zap

                                    size={16}

                                    className="text-yellow-400"

                                />

                                <p className="text-xs uppercase tracking-[0.2em] text-blue-300">

                                    Next Milestone

                                </p>

                            </div>

                            <h4 className="mt-3 font-semibold">

                                {nextNode.title}

                            </h4>

                            <p className="mt-1 text-sm text-zinc-400">

                                Earn +{nextNode.xp} XP

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default CareerProgressRing;