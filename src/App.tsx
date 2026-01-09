import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import Errorpage from "@/pages/ErrorPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuthStore } from "@/stores/authStore";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();

    return () => unsubscribe();
  }, [initialize]);

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        path="/home"
      />
      <Route element={<LandingPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<AuthPage />} path="/auth" />
      <Route element={<Errorpage />} path="*" />
    </Routes>
  );
}

export default App;
