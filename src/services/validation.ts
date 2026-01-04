import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export type AuthFormData = z.infer<typeof authSchema>;

export const validateAuthForm = (data: AuthFormData) => {
  return authSchema.safeParse(data);
};

export const getAuthErrorMessage = (error: Error): string => {
  const message = error.message.toLowerCase();

  if (message.includes("already registered")) {
    return "This email is already registered. Please sign in instead.";
  }
  if (message.includes("invalid login credentials")) {
    return "Invalid email or password. Please try again.";
  }
  if (message.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }
  if (message.includes("too many requests")) {
    return "Too many attempts. Please try again later.";
  }

  return error.message;
};
