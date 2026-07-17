import {
    ArrowRight,
    GraduationCap,
    LineChart,
    Lock,
    Mail,
    ShieldCheck,
    Sparkles,
    Users
} from "lucide-react";

import {
    useState
} from "react";

import { useNavigate } from "react-router-dom";

import Logo from "../../components/ui/Logo";
import Button from "../../components/ui/Button";

import { useAuth } from "../../context/AuthContext";

const ROLE_COPY = {

    candidate: {
        title: "Employee Sign In",
        subtitle: "Continue your learning journey and reach your next role.",
        namePlaceholder: "e.g. Alex Morgan",
        idPlaceholder: "Employee ID or email",
        cta: "Enter Learning Platform"
    },

    hr: {
        title: "HR / Manager Sign In",
        subtitle: "See workforce skill readiness and AI-powered insights.",
        namePlaceholder: "e.g. Priya Sharma",
        idPlaceholder: "HR ID or email",
        cta: "Enter HR Dashboard"
    }

};

function RoleCard({

    active,

    icon: Icon,

    title,

    description,

    onClick

}) {

    return (

        <button

            onClick={onClick}

            className={`
                flex-1
                rounded-2xl
                border
                p-6
                text-left
                transition-all
                duration-200
                ${
                    active
                        ? "border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-600/10"
                        : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                }
            `}

        >

            <div

                className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    ${active ? "bg-blue-600" : "bg-zinc-800"}
                `}

            >

                <Icon size={20} />

            </div>

            <h3 className="mt-4 font-semibold">

                {title}

            </h3>

            <p className="mt-1 text-sm text-zinc-500">

                {description}

            </p>

        </button>

    );

}

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [

        role,

        setRole

    ] = useState("candidate");

    const [

        name,

        setName

    ] = useState("");

    const [

        identifier,

        setIdentifier

    ] = useState("");

    const [

        password,

        setPassword

    ] = useState("");

    const copy = ROLE_COPY[role];

    function handleSubmit(event) {

        event.preventDefault();

        login({ role, name });

        navigate(role === "hr" ? "/hr" : "/", { replace: true });

    }

    return (

        <div

            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-zinc-950
                px-6
                py-12
                text-white
            "

        >

            <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2 lg:gap-16">

                {/* Left - Pitch */}

                <div className="hidden flex-col justify-center lg:flex">

                    <Logo />

                    <h1 className="mt-10 text-4xl font-black leading-tight">

                        Most employees want to grow.
                        <span className="text-blue-400"> They just don't know what to learn next.</span>

                    </h1>

                    <p className="mt-5 max-w-md text-zinc-400">

                        A personalized learning platform that guides every
                        employee toward the skills, experiences and learning
                        opportunities needed to reach their career goals -
                        powered by real YouTube content.

                    </p>

                    <div className="mt-10 space-y-4">

                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <Sparkles size={16} className="text-blue-400"/>
                            Netflix-style, personalized course discovery
                        </div>

                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <LineChart size={16} className="text-blue-400"/>
                            Live competency gap analysis for every role
                        </div>

                        <div className="flex items-center gap-3 text-sm text-zinc-400">
                            <Users size={16} className="text-blue-400"/>
                            Department-level readiness for HR and managers
                        </div>

                    </div>

                </div>

                {/* Right - Form */}

                <div className="w-full rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl sm:p-10">

                    <div className="mb-8 lg:hidden">

                        <Logo />

                    </div>

                    <div className="flex gap-4">

                        <RoleCard

                            active={role === "candidate"}
                            icon={GraduationCap}
                            title="Employee"
                            description="Learning experience"
                            onClick={() => setRole("candidate")}

                        />

                        <RoleCard

                            active={role === "hr"}
                            icon={ShieldCheck}
                            title="HR / Manager"
                            description="Analytics dashboard"
                            onClick={() => setRole("hr")}

                        />

                    </div>

                    <div className="mt-8">

                        <h2 className="text-2xl font-bold">

                            {copy.title}

                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">

                            {copy.subtitle}

                        </p>

                    </div>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                        <div>

                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                                Full Name
                            </label>

                            <input

                                value={name}
                                onChange={event => setName(event.target.value)}
                                placeholder={copy.namePlaceholder}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"

                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                                {role === "hr" ? "HR ID / Email" : "Employee ID / Email"}
                            </label>

                            <div className="relative">

                                <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"/>

                                <input

                                    value={identifier}
                                    onChange={event => setIdentifier(event.target.value)}
                                    placeholder={copy.idPlaceholder}
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"

                                />

                            </div>

                        </div>

                        <div>

                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                                Password
                            </label>

                            <div className="relative">

                                <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"/>

                                <input

                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"

                                />

                            </div>

                        </div>

                        <Button type="submit" className="mt-2 flex w-full items-center justify-center gap-2">

                            {copy.cta}

                            <ArrowRight size={18}/>

                        </Button>

                        <p className="text-center text-xs text-zinc-600">

                            Demo build — any name or credentials will sign you in
                            as a {role === "hr" ? "HR / Manager" : "Candidate"}.

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;
