import { useCallback, useState } from "react";

export type ToastType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "destructive";

export interface ToastItem {
  id: number;
  title?: string;
  description: string;
  variant?: ToastType;
  duration?: number;
}

let nextId = 1;

export const usePopToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (options: {
      title?: string;
      description: string;
      variant?: ToastType;
      duration?: number;
    }) => {
      const { title, description, variant = "info", duration = 3500 } = options;
      const id = nextId++;

      const toast: ToastItem = { id, title, description, variant, duration };

      setToasts((prev) => [...prev, toast]);

      return id;
    },
    []
  );

  return { toasts, addToast, removeToast };
};
