import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
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
      <Route element={<LandingPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<AuthPage />} path="/auth" />
      <Route
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        path="/home"
      />
    </Routes>
  );
}

export default App;
