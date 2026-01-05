import React from "react";

import { cn } from "@/utils/cn";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  name?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className: string;
}

export const ReusableInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  helperText,
  required = false,
  icon,
  onKeyPress,
  className = "",
}: InputProps) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={cn(
            "px-4 py-2",
            icon && "pl-11",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          )}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
