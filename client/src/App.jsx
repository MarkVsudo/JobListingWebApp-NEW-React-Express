import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import CompanyOverviewPage from "./pages/CompanyOverviewPage";
import CompanyPage from "./pages/CompanyPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";
import DashboardApplicationsPage from "./pages/DashboardApplicationsPage";
import DashboardSavedJobsPage from "./pages/DashboardSavedJobsPage";
import DashboardFilesPage from "./pages/DashboardFilesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />s
          <Route path="/" element={<HomePage />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/company-overview" element={<CompanyOverviewPage />} />
          <Route path="/company/:companyName" element={<CompanyPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
          <Route
            path="/dashboard/applications"
            element={<DashboardApplicationsPage />}
          />
          <Route
            path="/dashboard/saved-jobs"
            element={<DashboardSavedJobsPage />}
          />
          <Route path="/dashboard/files" element={<DashboardFilesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
