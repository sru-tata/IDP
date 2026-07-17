import clsx from "clsx";
import { NavLink } from "react-router-dom";

function SidebarItem({

    label,

    path,

    icon: Icon,

    end = false

}) {

    return (

        <NavLink

            to={path}

            end={end}

            className={({ isActive }) =>

                clsx(

                    "group",

                    "flex",

                    "items-center",

                    "gap-4",

                    "rounded-xl",

                    "px-4",

                    "py-3",

                    "transition-all",

                    "duration-300",

                    isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"

                )

            }

        >

            <Icon

                size={20}

                className="transition-transform duration-300 group-hover:scale-110"

            />

            <span

                className="font-medium"

            >

                {label}

            </span>

        </NavLink>

    );

}

export default SidebarItem;