import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  eventId?: string | null;
}

const reasons = [
  { id: "spam", label: "Spam" },
  { id: "inappropriate", label: "Inappropriate Content" },
  { id: "scam", label: "Scam / Fraud" },
  { id: "misleading", label: "Misleading Information" },
  { id: "other", label: "Other" },
] as const;

export function ReportModal({ onClose }: Props) {
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = () => {
    if (!selected) {
      toast.error("Please select a reason");
      return;
    }
    setSubmitted(true);
    toast.success("Report submitted. Our team will review it shortly.");
    setTimeout(onClose, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="report.dialog"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-sm rounded-2xl p-6 border border-border/30 z-10 animate-fade-in-up"
        style={{
          background: "rgba(10,10,26,0.99)",
          backdropFilter: "blur(24px)",
        }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onClose}
          data-ocid="report.close_button"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4" data-ocid="report.success_state">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="font-display font-semibold text-foreground">
              Report submitted!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Our team will review it shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-lg font-bold text-foreground mb-1 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              Report Event
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Why are you reporting this event?
            </p>

            <div className="space-y-2 mb-5">
              {reasons.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-smooth border ${
                    selected === r.id
                      ? "border-destructive/60 bg-destructive/10 text-destructive"
                      : "border-border/30 text-muted-foreground hover:bg-muted/10 hover:text-foreground hover:border-border/60"
                  }`}
                  onClick={() => setSelected(r.id)}
                  data-ocid={`report.reason.${r.id}`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 border-border/30"
                onClick={onClose}
                data-ocid="report.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={handleSubmit}
                disabled={!selected}
                data-ocid="report.confirm_button"
              >
                Submit Report
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
