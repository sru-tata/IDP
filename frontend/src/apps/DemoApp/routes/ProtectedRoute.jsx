import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allow }) {

    const { role } = useAuth();

    if (!role) {

        return <Navigate to="/login" replace />;

    }

    if (role !== allow) {

        return <Navigate to={role === "hr" ? "/hr" : "/"} replace />;

    }

    return <Outlet />;

}

export default ProtectedRoute;
