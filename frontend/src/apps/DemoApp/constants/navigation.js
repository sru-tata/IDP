import {
    House,
    LayoutDashboard,
    GitBranchPlus,
    Compass,
    Rocket,
    User
} from "lucide-react";

const navigation = [
    {
        id: 1,
        label: "Home",
        path: "/",
        icon: House,
        end: true
    },
    {
        id: 2,
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        id: 3,
        label: "Skill Tree",
        path: "/skill-tree",
        icon: GitBranchPlus
    },
    {
        id: 4,
        label: "Explore",
        path: "/explore",
        icon: Compass
    },
    {
        id: 5,
        label: "Grow",
        path: "/grow",
        icon: Rocket
    },
    {
        id: 6,
        label: "Profile",
        path: "/profile",
        icon: User
    }
];

export default navigation;
