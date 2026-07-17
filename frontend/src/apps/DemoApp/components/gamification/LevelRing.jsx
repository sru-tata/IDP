import { useUser } from "../../context/UserContext";

function LevelRing({ size = 44, strokeWidth = 4 }) {

    const { user } = useUser();

    if (!user) {

        return null;

    }

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(1, user.xp / user.xpToNextLevel);
    const offset = circumference - progress * circumference;

    return (

        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>

            <svg width={size} height={size} className="-rotate-90">

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-zinc-800"
                />

                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-yellow-400 transition-all duration-700 ease-out"
                />

            </svg>

            <span className="absolute text-xs font-bold">
                {user.currentLevel}
            </span>

        </div>

    );

}

export default LevelRing;
