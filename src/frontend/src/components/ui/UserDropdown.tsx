import { Copy, Lock, LogOut, Settings, Shield, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  email?: string;
  mockJWT?: string;
  profilePrivate: boolean;
  onTogglePrivacy: (val: boolean) => void;
  onLogout: () => void;
}

export function UserDropdown({
  email = "user@example.com",
  mockJWT,
  profilePrivate,
  onTogglePrivacy,
  onLogout,
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initials = email.split("@")[0].slice(0, 2).toUpperCase();

  const truncatedJWT = mockJWT
    ? `${mockJWT.slice(0, 38)}...`
    : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOi...";

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const copyJWT = () => {
    if (mockJWT) navigator.clipboard.writeText(mockJWT).catch(() => {});
    setCopied(true);
    toast.success("JWT copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    setOpen(false);
    onLogout();
    toast.info("Signed out successfully");
  };

  return (
    <div className="relative" ref={ref} data-ocid="user.dropdown">
      {/* Avatar trigger */}
      <button
        type="button"
        className="w-9 h-9 rounded-full gradient-hero flex items-center justify-center text-white text-sm font-bold border-2 border-primary/40 hover:border-primary/70 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
        data-ocid="user.avatar_button"
      >
        {initials}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-border/30 z-50 overflow-hidden animate-fade-in-up"
          style={{
            background: "rgba(10,10,26,0.99)",
            backdropFilter: "blur(24px)",
          }}
          data-ocid="user.dropdown_menu"
        >
          {/* User header */}
          <div className="p-4 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {email}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">
                    Verified account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* JWT display */}
          <div
            className="p-3 mx-3 mt-3 rounded-xl border border-border/20"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Lock className="w-3 h-3 text-accent shrink-0" />
              <span className="text-xs text-accent font-semibold">
                Auth Token (JWT)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="text-xs text-muted-foreground font-mono flex-1 min-w-0 truncate">
                {truncatedJWT}
              </code>
              <button
                type="button"
                className="p-1 rounded hover:bg-muted/10 text-muted-foreground hover:text-foreground transition-smooth shrink-0"
                onClick={copyJWT}
                data-ocid="user.copy_jwt_button"
                aria-label="Copy JWT token"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            {copied && <p className="text-xs text-green-400 mt-0.5">Copied!</p>}
          </div>

          {/* Privacy toggle */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground font-medium">
                    Profile Visibility
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profilePrivate
                      ? "Private — only you"
                      : "Public — visible to all"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className={`relative w-11 h-6 rounded-full transition-smooth ${profilePrivate ? "bg-primary" : "bg-muted/40"}`}
                onClick={() => onTogglePrivacy(!profilePrivate)}
                aria-label={`Profile is ${profilePrivate ? "private" : "public"}`}
                data-ocid="user.privacy_toggle"
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-smooth ${profilePrivate ? "right-1" : "left-1"}`}
                />
              </button>
            </div>
          </div>

          {/* Menu items */}
          <div className="border-t border-border/20 pb-2">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/10 transition-smooth"
              onClick={() => setOpen(false)}
              data-ocid="user.settings_link"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-smooth"
              onClick={handleLogout}
              data-ocid="user.logout_button"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
