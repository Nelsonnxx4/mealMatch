import { createBrowserRouter } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import Errorpage from "@/pages/ErrorPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallbackPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);
