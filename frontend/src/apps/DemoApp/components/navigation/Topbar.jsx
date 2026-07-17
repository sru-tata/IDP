import {
    Bell,
    Flame,
    LogOut,
    Search,
    Star,
    User,
    UserRound,
    X
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";

import { useUser } from "../../context/UserContext";
import { useCourses } from "../../context/CourseContext";
import { useCompetencies } from "../../context/CompetencyContext";
import { useAuth } from "../../context/AuthContext";

function Topbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const { logout } = useAuth();

    const {

        user

    } = useUser();

    const {

        query,

        search,

        clear,

        suggestions = [],

        recommendedCourses = []

    } = useCourses();

    const {

        skillGaps = []

    } = useCompetencies();

    const [

        input,

        setInput

    ] = useState(query);

    const [

        notificationsOpen,

        setNotificationsOpen

    ] = useState(false);

    const [

        accountMenuOpen,

        setAccountMenuOpen

    ] = useState(false);

    const notifications = [

        user?.streak > 0 && {

            id: "streak",

            icon: "🔥",

            text: `You're on a ${user.streak}-day learning streak. Keep it going today!`

        },

        recommendedCourses[0] && {

            id: "recommended",

            icon: "🎬",

            text: `New for you: "${recommendedCourses[0].title}"`

        },

        skillGaps[0] && {

            id: "skill-gap",

            icon: "📈",

            text: `${skillGaps[0].name} is your biggest growth opportunity right now.`

        }

    ].filter(Boolean);

    useEffect(() => {

        setInput(query);

    }, [

        query

    ]);

    if (!user) {

        return null;

    }

    function handleInput(value) {

        setInput(value);

        search(value);

        if (location.pathname !== "/explore") {

            navigate("/explore");

        }

    }

    function clearSearch() {

        setInput("");

        clear();

    }

    function chooseSuggestion(course) {

        setInput(course.title);

        search(course.title);

        navigate("/explore");

    }

    const initials = user.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (

        <header
            className="
                sticky
                top-0
                z-50
                flex
                h-20
                items-center
                justify-between
                border-b
                border-zinc-800
                bg-zinc-950/80
                px-8
                backdrop-blur-xl
            "
        >

            {/* Search */}

            <div className="relative w-full max-w-xl">

                <Search
                    size={18}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-zinc-500
                    "
                />

                <input

                    value={input}

                    onChange={(e) =>

                        handleInput(

                            e.target.value

                        )

                    }

                    placeholder="Search courses, skills or competencies..."

                    className="
                        w-full
                        rounded-2xl
                        border
                        border-zinc-800
                        bg-zinc-900
                        py-3
                        pl-12
                        pr-12
                        text-sm
                        transition
                        outline-none
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                    "

                />

                {

                    input && (

                        <button

                            onClick={clearSearch}

                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                            "

                        >

                            <X

                                size={17}

                                className="text-zinc-500"

                            />

                        </button>

                    )

                }

                {

                    input &&

                    suggestions.length > 0 && (

                        <div
                            className="
                                absolute
                                left-0
                                right-0
                                top-[105%]
                                overflow-hidden
                                rounded-2xl
                                border
                                border-zinc-800
                                bg-zinc-900
                                shadow-2xl
                            "
                        >

                            {

                                suggestions.map(course => (

                                    <button

                                        key={course.id}

                                        onClick={() =>

                                            chooseSuggestion(course)

                                        }

                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            px-5
                                            py-4
                                            transition
                                            hover:bg-zinc-800
                                        "

                                    >

                                        <div className="text-left">

                                            <p className="font-medium">

                                                {course.title}

                                            </p>

                                            <p className="mt-1 text-xs text-zinc-500">

                                                {course.category}

                                            </p>

                                        </div>

                                        <Search

                                            size={16}

                                            className="text-zinc-600"

                                        />

                                    </button>

                                ))

                            }

                        </div>

                    )

                }

            </div>

            {/* Right Side */}

            <div className="ml-10 flex items-center gap-3">

                <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2">

                    <Flame

                        size={17}

                        className="text-orange-500"

                    />

                    <span className="text-sm font-medium">

                        {user.streak}

                    </span>

                </div>

                <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2">

                    <Star

                        size={17}

                        className="text-yellow-400"

                    />

                    <span className="text-sm font-medium">

                        Lv {user.currentLevel}

                    </span>

                </div>

                <div
                    className="
                        rounded-xl
                        bg-blue-600/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-blue-400
                    "
                >

                    {user.xp.toLocaleString()} XP

                </div>

                <div className="relative">

                    <button
                        onClick={() => setNotificationsOpen(previous => !previous)}
                        className="
                            relative
                            rounded-xl
                            bg-zinc-900
                            p-3
                            transition
                            hover:bg-zinc-800
                        "
                    >

                        <Bell size={19} />

                        {
                            notifications.length > 0 && (

                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500" />

                            )
                        }

                    </button>

                    {
                        notificationsOpen && (

                            <>

                                <div
                                    onClick={() => setNotificationsOpen(false)}
                                    className="fixed inset-0 z-40"
                                />

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-[120%]
                                        z-50
                                        w-80
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-zinc-800
                                        bg-zinc-900
                                        shadow-2xl
                                    "
                                >

                                    <div className="border-b border-zinc-800 px-5 py-4 text-sm font-semibold">
                                        Notifications
                                    </div>

                                    {
                                        notifications.length === 0 ? (

                                            <p className="px-5 py-6 text-sm text-zinc-500">
                                                You're all caught up.
                                            </p>

                                        ) : (

                                            notifications.map(notification => (

                                                <div
                                                    key={notification.id}
                                                    className="flex items-start gap-3 border-b border-zinc-800/60 px-5 py-4 text-sm last:border-b-0"
                                                >
                                                    <span>{notification.icon}</span>
                                                    <span className="text-zinc-300">{notification.text}</span>
                                                </div>

                                            ))

                                        )
                                    }

                                </div>

                            </>

                        )
                    }

                </div>

                <div className="relative">

                    <button
                        onClick={() => setAccountMenuOpen(previous => !previous)}
                        className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-blue-600
                            to-cyan-500
                            font-semibold
                            transition
                            hover:opacity-90
                        "
                    >

                        {

                            user.avatar

                                ?

                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-full w-full rounded-full object-cover"
                                />

                                :

                                initials

                        }

                    </button>

                    {
                        accountMenuOpen && (

                            <>

                                <div
                                    onClick={() => setAccountMenuOpen(false)}
                                    className="fixed inset-0 z-40"
                                />

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-[120%]
                                        z-50
                                        w-56
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-zinc-800
                                        bg-zinc-900
                                        shadow-2xl
                                    "
                                >

                                    <div className="border-b border-zinc-800 px-5 py-4">
                                        <p className="text-sm font-semibold">{user.name}</p>
                                        <p className="text-xs text-zinc-500">{user.currentRole}</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            navigate("/profile");
                                        }}
                                        className="flex w-full items-center gap-2 px-5 py-3 text-left text-sm text-zinc-300 transition hover:bg-zinc-800"
                                    >
                                        <UserRound size={15}/>
                                        View Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            setAccountMenuOpen(false);
                                            logout();
                                            navigate("/login", { replace: true });
                                        }}
                                        className="flex w-full items-center gap-2 px-5 py-3 text-left text-sm text-red-400 transition hover:bg-zinc-800"
                                    >
                                        <LogOut size={15}/>
                                        Log Out
                                    </button>

                                </div>

                            </>

                        )
                    }

                </div>

            </div>

        </header>

    );

}

export default Topbar;