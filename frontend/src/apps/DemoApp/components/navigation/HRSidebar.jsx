import {
    LogOut,
    ShieldCheck
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Logo from "../ui/Logo";
import SidebarItem from "./SidebarItem";

import hrNavigation from "../../constants/hrNavigation";

import { useAuth } from "../../context/AuthContext";
import { useHR } from "../../context/HRContext";

function HRSidebar() {

    const navigate = useNavigate();

    const { name, logout } = useAuth();

    const { orgStats } = useHR();

    function handleLogout() {

        logout();

        navigate("/login", { replace: true });

    }

    return (

        <aside
            className="
                flex
                h-screen
                w-72
                flex-col
                border-r
                border-zinc-800
                bg-zinc-950
            "
        >

            <div className="border-b border-zinc-800 p-6">
                <Logo />
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto p-4">

                {

                    hrNavigation.map(item => (

                        <SidebarItem key={item.id} {...item}/>

                    ))

                }

            </nav>

            <div className="border-t border-zinc-800 p-5 space-y-5">

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                    <div className="flex items-center gap-2 text-blue-400">
                        <ShieldCheck size={16}/>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            Signed in as
                        </p>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold">
                        {name || "HR Admin"}
                    </h4>

                    {
                        orgStats && (
                            <p className="mt-1 text-xs text-zinc-500">
                                Monitoring {orgStats.totalHeadcount.toLocaleString()} employees
                            </p>
                        )
                    }

                </div>

                <button

                    onClick={handleLogout}

                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-zinc-900
                        py-3
                        text-sm
                        font-medium
                        text-zinc-400
                        transition
                        hover:bg-zinc-800
                        hover:text-white
                    "

                >

                    <LogOut size={15}/>
                    Log Out

                </button>

            </div>

        </aside>

    );

}

export default HRSidebar;
