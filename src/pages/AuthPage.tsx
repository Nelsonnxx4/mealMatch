import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@heroui/divider";

import { useAuthForm } from "@/hooks/useAuthForm";
import { ToastContainer } from "@/components/Toast";
import { useAuthStore } from "@/stores/authStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleIcon } from "@/components/icons";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSignUp,
    handleSignIn,
    handleGoogleSignIn,
    toasts,
    removeToast,
  } = useAuthForm();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] flex justify-center items-center flex-col h-max md:bg-[#ffff] md:p-6 rounded md:shadow-md space-y-6">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-2xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-default-500">
              {isSignUp ? "Sign up to get started" : "Sign in to your account"}
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <form
            className=" w-full flex justify-center items-center flex-col gap-4"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              className=""
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-1/2" isLoading={isLoading} type="submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <Divider />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-default-400">
              or
            </span>
          </div>

          <div className="flex justify-center w-full ">
            <Button
              icon={<GoogleIcon />}
              isLoading={isLoading}
              variant="outline"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="justify-center mt-8">
          <p className="text-sm text-default-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-orange-400 underline font-semibold "
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <Link className="text-center py-4 underline" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
