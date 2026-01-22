import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Spinner from "./ui/Spinner";

import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner label="Loading..." size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate replace to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
