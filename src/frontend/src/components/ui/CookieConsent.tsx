import { Button } from "@/components/ui/button";
import { Cookie, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onAccept: () => void;
  onReject: () => void;
}

export function CookieConsent({ onAccept, onReject }: Props) {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState({
    analytics: true,
    marketing: false,
    functional: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setVisible(false);
    setTimeout(onAccept, 300);
  };

  const handleReject = () => {
    setVisible(false);
    setTimeout(onReject, 300);
  };

  const handleSavePrefs = () => {
    setVisible(false);
    setTimeout(onAccept, 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-40 rounded-2xl border border-border/30 overflow-hidden transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      style={{
        background: "rgba(10,10,26,0.97)",
        backdropFilter: "blur(20px)",
      }}
      data-ocid="cookie.banner"
    >
      {showCustomize ? (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              Cookie Preferences
            </h4>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              onClick={() => setShowCustomize(false)}
              aria-label="Back"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3 mb-4">
            {[
              {
                key: "functional" as const,
                label: "Functional",
                desc: "Required for the site to work.",
                locked: true,
              },
              {
                key: "analytics" as const,
                label: "Analytics",
                desc: "Help us improve the experience.",
                locked: false,
              },
              {
                key: "marketing" as const,
                label: "Marketing",
                desc: "Personalized event recommendations.",
                locked: false,
              },
            ].map(({ key, label, desc, locked }) => (
              <div key={key} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button
                  type="button"
                  className={`relative shrink-0 w-10 h-5 rounded-full transition-smooth mt-0.5 ${prefs[key] || locked ? "bg-primary" : "bg-muted/40"} ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    !locked && setPrefs((p) => ({ ...p, [key]: !p[key] }))
                  }
                  aria-label={`Toggle ${label}`}
                  disabled={locked}
                  data-ocid={`cookie.pref_${key}_toggle`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-smooth ${prefs[key] || locked ? "right-0.5" : "left-0.5"}`}
                  />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            size="sm"
            className="w-full gradient-hero text-white border-0 hover:opacity-90"
            onClick={handleSavePrefs}
            data-ocid="cookie.save_prefs_button"
          >
            Save Preferences
          </Button>
        </div>
      ) : (
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <Cookie className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-foreground">
                We use cookies 🍪
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                We use cookies to enhance your experience, remember preferences,
                and analyze traffic. Your privacy matters — you're in control.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="flex-1 text-xs border-border/30 hover:bg-muted/10"
              onClick={handleReject}
              data-ocid="cookie.reject_button"
            >
              Reject
            </Button>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground underline px-2 transition-smooth"
              onClick={() => setShowCustomize(true)}
              data-ocid="cookie.customize_button"
            >
              Customize
            </button>
            <Button
              type="button"
              size="sm"
              className="flex-1 text-xs gradient-hero text-white border-0 hover:opacity-90"
              onClick={handleAccept}
              data-ocid="cookie.accept_button"
            >
              Accept All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
