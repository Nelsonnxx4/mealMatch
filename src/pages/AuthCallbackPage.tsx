import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "@/config/supabase";
import Spinner from "@/components/ui/Spinner";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for errors in URL
        const params = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );

        const error = params.get("error") || hashParams.get("error");

        if (error) {
          console.error("Auth callback error:", error);
          navigate("/auth");

          return;
        }

        // Exchange code for session
        const code = params.get("code");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            console.error("Exchange error:", exchangeError);
            navigate("/auth");

            return;
          }
        }

        // Check if we have a session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          navigate("/home", { replace: true });
        } else {
          navigate("/auth");
        }
      } catch (err) {
        console.error("Callback error:", err);
        navigate("/auth");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner color="current" label="Completing sign in..." size="lg" />
    </div>
  );
};

export default AuthCallbackPage;
