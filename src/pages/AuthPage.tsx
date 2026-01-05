import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@heroui/divider";

import { useAuthForm } from "@/hooks/useAuthForm";
import { ToastContainer } from "@/components/Toast";
import { useAuthStore } from "@/stores/authStore";
import { ReusableInput } from "@/components/ui/ReusableInput";
import { Button } from "@/components/ui/Button";

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

  // if (user) {
  //   navigate("/home");
  // }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="w-[90%] h-max bg-white">
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

        <div className="w-full">
          <form
            className=" w-full flex flex-col gap-4"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            <ReusableInput
              className="py-2 bg-blue-300"
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input className="w-full py-2 px-2" type="email" />

            <ReusableInput
              className="py-2"
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

          <Button
            className="w-full"
            isLoading={isLoading}
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
        </div>

        <Divider />

        <div className="justify-center">
          <p className="text-sm text-default-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-primary font-semibold hover:underline"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>

        <Link className="text-center pb-4" to="/">
          <Button size="sm">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
