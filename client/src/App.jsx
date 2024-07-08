import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/ProfileLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import WhoWeArePage from "./pages/WhoWeArePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import CompanyOverviewPage from "./pages/CompanyOverviewPage";
import CompanyPage from "./pages/CompanyPage";
import JobListingsPage from "./pages/JobListingsPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPage from "./pages/BlogPage";
import RecruiterVerificationPage from "./pages/RecruiterVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import FilesPage from "./pages/FilesPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import VerificationReviewPage from "./pages/VerificationReviewPage";

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
          <Route path="/job-listings" element={<JobListingsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:blogId" element={<BlogPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path="/verification-review"
            element={<VerificationReviewPage />}
          />
          <Route
            path="/recruiter-verification"
            element={<RecruiterVerificationPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/files" element={<FilesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
