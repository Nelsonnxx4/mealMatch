import React from "react";

import { cn } from "@/utils/cn";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray" | "current";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-4 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const colorMap = {
  primary: "text-primary-300",
  secondary: "text-secondary-500",
  white: "text-[#fff]",
  gray: "text-gray-500",
  current: "text-",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
  label,
}) => {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <svg
        className={cn(
          "animate-spin",
          sizeMap[size],
          colorMap[color],
          className
        )}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.25A9.25 9.25 0 1 0 2.75 12" />
      </svg>
      {label && (
        <span className={cn("text-sm font-medium", colorMap[color])}>
          {label}
        </span>
      )}
    </div>
  );
};

// Full page spinner overlay
interface SpinnerOverlayProps {
  message?: string;
  blur?: boolean;
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({
  message,
  blur = true,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/20",
        blur && "backdrop-blur-sm"
      )}
    >
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center gap-4">
        <Spinner size="lg" />
        {message && <p className="text-gray-700 font-medium">{message}</p>}
      </div>
    </div>
  );
};

// Button with loading spinner
interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  spinnerSize?: "sm" | "md" | "lg" | "xl";
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  spinnerSize = "sm",
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-300 text-white font-medium hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Spinner color="white" size={spinnerSize} />}
      {children}
    </button>
  );
};

export default Spinner;
