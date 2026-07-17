import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const AuthContext = createContext();

const STORAGE_KEY = "neuronest.auth";

function readStoredAuth() {

    try {

        const raw = window.localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : null;

    }
    catch {

        return null;

    }

}

/*
--------------------------------------------------------------------------
AuthContext

Frontend-only demo authentication. There is no real backend user store
yet (the FastAPI service in /backend is a generic chat template), so
this simulates two roles - "candidate" (the learner-facing Netflix-style
experience) and "hr" (the analytics dashboard) - and persists the choice
to localStorage so a refresh doesn't kick you back to the login screen.
--------------------------------------------------------------------------
*/
function AuthProvider({ children }) {

    const [

        session,

        setSession

    ] = useState(() => readStoredAuth());

    const [

        ready,

        setReady

    ] = useState(true);

    useEffect(() => {

        if (session) {

            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

        }
        else {

            window.localStorage.removeItem(STORAGE_KEY);

        }

    }, [session]);

    function login({ role, name }) {

        setSession({

            role,
            name: name?.trim() || (role === "hr" ? "HR Admin" : "Candidate"),
            loggedInAt: new Date().toISOString()

        });

    }

    function logout() {

        setSession(null);

    }

    const value = useMemo(() => ({

        ready,

        role: session?.role ?? null,

        name: session?.name ?? null,

        isAuthenticated: !!session,

        login,

        logout

    }), [

        ready,

        session

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}

export default AuthProvider;
