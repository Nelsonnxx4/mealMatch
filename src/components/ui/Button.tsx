import React from "react";

import Spinner from "./Spinner";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "sm",
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = "left",
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "font-semibold rounded-md transition  focus:outline-none focus:ring-2  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-main-100 shadow-lg focus:ring-orange-50 ",
    secondary: "bg-gray-100 text-orange-200 shadow-md focus:ring-orange-50",
    outline:
      "border-1 border-slate-300 hover:bg-slate-100 focus:ring-orange-500",
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-6 py-4 text-base",
    lg: "px-8 py-5 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>Signing in</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </>
      )}
    </button>
  );
};
