import {
    PartyPopper,
    Zap
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import { useUser } from "../../context/UserContext";

function XPToast() {

    const { xpEvent } = useUser();

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if (!xpEvent) {

            return;

        }

        setVisible(true);

        const timer = setTimeout(

            () => setVisible(false),

            xpEvent.leveledUp ? 4200 : 2600

        );

        return () => clearTimeout(timer);

    }, [xpEvent]);

    if (!xpEvent) {

        return null;

    }

    return (

        <div

            key={xpEvent.key}

            className={`
                fixed
                right-8
                top-8
                z-[200]
                transition-all
                duration-300
                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                }
            `}

        >

            {

                xpEvent.leveledUp ? (

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-yellow-500/30
                            bg-gradient-to-r
                            from-yellow-500/20
                            via-orange-500/20
                            to-zinc-900
                            px-6
                            py-4
                            shadow-2xl
                            shadow-yellow-500/10
                            backdrop-blur-xl
                        "
                    >

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400">
                            <PartyPopper size={22}/>
                        </div>

                        <div>
                            <p className="font-bold text-yellow-300">
                                Level Up! You're now Level {xpEvent.newLevel}
                            </p>
                            <p className="text-sm text-zinc-400">
                                +{xpEvent.amount} XP
                            </p>
                        </div>

                    </div>

                ) : (

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-blue-500/30
                            bg-zinc-900/95
                            px-5
                            py-3
                            shadow-2xl
                            backdrop-blur-xl
                        "
                    >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                            <Zap size={16}/>
                        </div>

                        <p className="font-semibold text-blue-300">
                            +{xpEvent.amount} XP
                        </p>

                    </div>

                )

            }

        </div>

    );

}

export default XPToast;
