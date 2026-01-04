import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";

import { useAuthForm } from "@/hooks/useAuthForm";
import { ToastContainer } from "@/components/Toast";
import { Logo, GithubIcon } from "@/components/icons";
import { useAuthStore } from "@/stores/authStore";

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 items-center">
          <Logo size={48} />
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-2xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-default-500">
              {isSignUp ? "Sign up to get started" : "Sign in to your account"}
            </p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="gap-4">
          <form
            className="flex flex-col gap-4"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            <Input
              isRequired
              autoComplete="email"
              label="Email"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              isRequired
              autoComplete={isSignUp ? "new-password" : "current-password"}
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="w-full"
              color="primary"
              isLoading={isLoading}
              type="submit"
            >
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
            startContent={<GithubIcon size={20} />}
            variant="bordered"
            onPress={handleGoogleSignIn}
          >
            Continue with Google
          </Button>
        </CardBody>

        <Divider />

        <CardFooter className="justify-center">
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
        </CardFooter>

        <Link className="text-center pb-4" to="/">
          <Button size="sm" variant="light">
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default AuthPage;
