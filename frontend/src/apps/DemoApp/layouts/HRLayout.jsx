import { Outlet } from "react-router-dom";

import HRSidebar from "../components/navigation/HRSidebar";
import HRTopbar from "../components/navigation/HRTopbar";

function HRLayout() {

    return (
        <div className="flex h-screen bg-zinc-950 text-white">

            <HRSidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <HRTopbar />

                <main
                    className="
                        flex-1
                        overflow-y-auto
                        bg-zinc-950
                        p-8
                    "
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default HRLayout;
