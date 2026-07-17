import { Search } from "lucide-react";

import { useNavigate } from "react-router-dom";

function HRTopbar() {

    const navigate = useNavigate();

    return (

        <header
            className="
                flex
                items-center
                justify-between
                border-b
                border-zinc-800
                bg-zinc-950/80
                px-8
                py-5
                backdrop-blur
            "
        >

            <div className="flex items-center gap-2 text-sm text-zinc-500">
                <ShieldBadge/>
                HR / Manager Analytics
            </div>

            <button

                onClick={() => navigate("/hr/employees")}

                className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-zinc-900
                    px-4
                    py-2.5
                    text-sm
                    text-zinc-400
                    transition
                    hover:bg-zinc-800
                    hover:text-white
                "

            >

                <Search size={15}/>
                Find an employee

            </button>

        </header>

    );

}

function ShieldBadge() {

    return (

        <span className="flex h-2 w-2 rounded-full bg-green-500"/>

    );

}

export default HRTopbar;
