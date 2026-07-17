import {
    LayoutDashboard,
    Sparkles,
    Users
} from "lucide-react";

const hrNavigation = [

    {
        id: 1,
        label: "Dashboard",
        path: "/hr",
        icon: LayoutDashboard,
        end: true
    },
    {
        id: 2,
        label: "Employees",
        path: "/hr/employees",
        icon: Users
    },
    {
        id: 3,
        label: "Insights",
        path: "/hr/insights",
        icon: Sparkles
    }

];

export default hrNavigation;
