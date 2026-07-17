import {
    ChevronDown,
    BriefcaseBusiness,
    Check
} from "lucide-react";

import { useUser } from "../../context/UserContext";

function TargetRoleSelector() {

    const {

        user,

        availableRoles,

        changeTargetRole

    } = useUser();

    if (

        !user ||

        !availableRoles.length

    ) {

        return null;

    }

    return (

        <div>

            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">

                Target Career

            </p>

            <div className="relative">

                <BriefcaseBusiness

                    size={18}

                    className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-blue-400
                    "

                />

                <ChevronDown

                    size={18}

                    className="
                        pointer-events-none
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-zinc-500
                    "

                />

                <select

                    value={user.targetRoleId}

                    onChange={(event) =>

                        changeTargetRole(

                            event.target.value

                        )

                    }

                    className="
                        w-full
                        appearance-none
                        rounded-2xl
                        border
                        border-zinc-800
                        bg-zinc-950
                        py-4
                        pl-12
                        pr-10
                        text-sm
                        font-medium
                        outline-none
                        transition-all
                        duration-300
                        hover:border-blue-500/50
                        focus:border-blue-500
                    "

                >

                    {

                        availableRoles.map(role => (

                            <option

                                key={role.id}

                                value={role.id}

                            >

                                {role.title}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div

                className="
                    mt-4
                    flex
                    items-start
                    gap-2
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                    px-3
                    py-3
                    text-xs
                    text-emerald-400
                "

            >

                <Check

                    size={15}

                    className="mt-0.5 shrink-0"

                />

                <span>

                    Your learning roadmap, recommendations, competency gaps,
                    dashboard insights and skill tree update automatically
                    whenever you change your target career.

                </span>

            </div>

        </div>

    );

}

export default TargetRoleSelector;