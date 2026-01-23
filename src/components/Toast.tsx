import type { ToastItem, ToastType } from "@/hooks/useToast";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  toast: ToastItem;
  onRemove: (id: number) => void;
}

const variantConfig: Record<
  ToastType,
  { icon: React.ReactNode; className: string }
> = {
  success: {
    icon: <CheckCircle size={20} />,
    className: "bg-green-50 border-green-200 text-green-800",
  },
  error: {
    icon: <AlertCircle size={20} />,
    className: "bg-red-50 border-red-200 text-red-800",
  },
  destructive: {
    icon: <AlertCircle size={20} />,
    className: "bg-red-50 border-red-200 text-red-800",
  },
  warning: {
    icon: <AlertTriangle size={20} />,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
  },
  info: {
    icon: <Info size={20} />,
    className: "bg-blue-50 border-blue-200 text-blue-800",
  },
};

export const Toast = ({ toast, onRemove }: ToastProps) => {
  const variant = toast.variant || "info";
  const config = variantConfig[variant];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        onRemove(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`${config.className} border rounded-lg p-4 shadow-lg min-w-[320px] max-w-md animate-in slide-in-from-right-full duration-300`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h3 className="font-semibold text-sm mb-1">{toast.title}</h3>
          )}
          <p className="text-sm leading-relaxed">{toast.description}</p>
        </div>
        <button
          aria-label="Close notification"
          className="flex-shrink-0 text-current hover:opacity-70 transition-opacity ml-2"
          onClick={() => onRemove(toast.id)}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-10 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};
