import { Route, Routes } from "react-router-dom";

import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";

function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<AuthPage />} path="/auth" />
      <Route element={<HomePage />} path="/home" />
    </Routes>
  );
}

export default App;
