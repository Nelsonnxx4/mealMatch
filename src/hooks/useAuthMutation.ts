// src/hooks/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOut as authSignOut,
} from "@/services/auth";
import { usePopToast } from "./useToast";
import { getAuthErrorMessage } from "@/services/validation";

export const useSignUp = () => {
  const navigate = useNavigate();
  const { addToast } = usePopToast();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUpWithEmail(email, password),
    onSuccess: () => {
      addToast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
        variant: "success",
      });
      navigate("/home");
    },
    onError: (error: Error) => {
      addToast({
        title: "Sign Up Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    },
  });
};

export const useSignIn = () => {
  const navigate = useNavigate();
  const { addToast } = usePopToast();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithEmail(email, password),
    onSuccess: () => {
      addToast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
        variant: "success",
      });
      navigate("/home");
    },
    onError: (error: Error) => {
      addToast({
        title: "Sign In Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    },
  });
};

export const useGoogleSignIn = () => {
  const { addToast } = usePopToast();

  return useMutation({
    mutationFn: signInWithGoogle,
    onError: (error: Error) => {
      addToast({
        title: "Google Sign In Failed",
        description: getAuthErrorMessage(error),
        variant: "destructive",
      });
    },
  });
};

export const useSignOut = () => {
  const navigate = useNavigate();
  const { addToast } = usePopToast();

  return useMutation({
    mutationFn: authSignOut,
    onSuccess: () => {
      addToast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
        variant: "success",
      });
      navigate("/auth");
    },
    onError: (error: Error) => {
      addToast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "error",
      });
    },
  });
};
