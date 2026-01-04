import { useCallback, useState } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

let nextId = 1;

export const usePopToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (
      message: string,
      options: { type?: ToastType; duration?: number } = {}
    ) => {
      const { type = "info", duration = 3500 } = options;
      const id = nextId++;

      const toast: ToastItem = { id, message, type, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast]
  );

  return { toasts, addToast, removeToast };
};
