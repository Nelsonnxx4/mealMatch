import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/authStore";
import { validateAuthForm, getAuthErrorMessage } from "@/services/validation";
import { usePopToast } from "@/hooks/useToast";

export const useAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, signIn, signInWithGoogle } = useAuthStore();
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = usePopToast();

  const validate = (): boolean => {
    const result = validateAuthForm({ email, password });

    if (!result.success) {
      // Changed from toasts() to addToast()
      addToast({
        title: "Validation Error",
        description: result.error.errors[0]?.message || "Invalid input",
        variant: "destructive",
      });

      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const { error } = await signUp(email, password);

    setIsLoading(false);

    if (error) {
      // Changed from toasts() to addToast()
      addToast({
        title: "Sign Up Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    } else {
      // Changed from toasts() to addToast()
      addToast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
        variant: "success",
      });
      navigate("/home");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const { error } = await signIn(email, password);

    setIsLoading(false);

    if (error) {
      // Changed from toasts() to addToast()
      addToast({
        title: "Sign In Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    } else {
      addToast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        variant: "success",
      });
      navigate("/home");
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();

    setIsLoading(false);

    if (error) {
      // Changed from toasts() to addToast()
      addToast({
        title: "Google Sign In Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleSignUp,
    handleSignIn,
    handleGoogleSignIn,
    resetForm,
    toasts,
    removeToast,
  };
};
