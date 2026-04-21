import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastVariant =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "rate-limit";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
}

const variantMeta: Record<
  ToastVariant,
  { icon: typeof AlertTriangle; bg: string; text: string; border: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "rgba(16,185,129,0.12)",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  error: {
    icon: XCircle,
    bg: "rgba(239,68,68,0.12)",
    text: "text-red-400",
    border: "border-red-500/30",
  },
  info: {
    icon: Info,
    bg: "rgba(59,130,246,0.12)",
    text: "text-blue-400",
    border: "border-blue-500/30",
  },
  warning: {
    icon: AlertTriangle,
    bg: "rgba(245,158,11,0.12)",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  "rate-limit": {
    icon: AlertTriangle,
    bg: "rgba(249,115,22,0.12)",
    text: "text-orange-400",
    border: "border-orange-500/30",
  },
};

export function Toast({
  message,
  variant = "info",
  duration = 3000,
  onDismiss,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const meta = variantMeta[variant];
  const Icon = meta.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-300 ${meta.border} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      style={{
        background: "rgba(10,10,26,0.97)",
        backdropFilter: "blur(16px)",
      }}
      role="alert"
      data-ocid="toast"
    >
      <Icon className={`w-4 h-4 shrink-0 ${meta.text}`} />
      <p className={`text-sm font-medium flex-1 ${meta.text}`}>{message}</p>
      {onDismiss && (
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition-smooth shrink-0"
          onClick={() => {
            setVisible(false);
            setTimeout(() => onDismiss(), 300);
          }}
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// Toast stack manager — shows multiple toasts, used for rate limit UX etc.
interface ToastStackProps {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

export function ToastStack({ toasts, onRemove }: ToastStackProps) {
  return (
    <div
      className="fixed top-20 right-4 z-50 flex flex-col gap-2 min-w-[280px] max-w-sm"
      data-ocid="toast_stack"
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          variant={t.variant}
          onDismiss={() => onRemove(t.id)}
        />
      ))}
    </div>
  );
}

// Rate limit specific toast — matches spec
export function RateLimitToast({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <Toast
      message="⚠️ Slow down! Too many requests. Please wait a moment."
      variant="rate-limit"
      duration={3000}
      onDismiss={onDismiss}
    />
  );
}
