import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import HRLayout from "../layouts/HRLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login/Login";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import SkillTree from "../pages/SkillTree/SkillTree";
import Explore from "../pages/Explore/Explore";
import Grow from "../pages/Grow/Grow";
import Profile from "../pages/Profile/Profile";

import HRDashboard from "../pages/HR/HRDashboard";
import HREmployees from "../pages/HR/HREmployees";
import HRInsights from "../pages/HR/HRInsights";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />

      {/* Candidate experience */}
      <Route element={<ProtectedRoute allow="candidate" />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-tree" element={<SkillTree />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* HR / Manager experience */}
      <Route element={<ProtectedRoute allow="hr" />}>
        <Route element={<HRLayout />}>
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/hr/employees" element={<HREmployees />} />
          <Route path="/hr/insights" element={<HRInsights />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRoutes;
