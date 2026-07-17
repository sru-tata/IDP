import { GraduationCap } from "lucide-react";

function Logo() {
    return (
        <div className="flex items-center gap-3">

            <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                shadow-lg
                shadow-blue-600/30
            "
            >
                <GraduationCap
                    size={26}
                    strokeWidth={2.2}
                />
            </div>

            <div>

                <h1
                    className="
                    text-lg
                    font-bold
                    tracking-tight
                "
                >
                    NeuroNest
                </h1>

                <p
                    className="
                    text-xs
                    text-zinc-400
                "
                >
                    Learning Intelligence
                </p>

            </div>

        </div>
    );
}

export default Logo;