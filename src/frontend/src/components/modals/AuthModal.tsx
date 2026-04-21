import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Eye, EyeOff, Lock, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  mode: "login" | "register";
  onClose: () => void;
  onLogin: (email: string) => void;
  onRegister: () => void;
  mockJWT?: string;
  isLoggedIn?: boolean;
}

function getStrength(pw: string): 0 | 1 | 2 | 3 | 4 {
  if (!pw) return 0;
  if (pw.length < 6) return 1;
  if (pw.length < 10) return 2;
  if (pw.length < 14) return 3;
  return 4;
}

const strengthMeta = [
  { label: "", color: "" },
  { label: "Weak", color: "bg-red-500" },
  { label: "Fair", color: "bg-orange-400" },
  { label: "Good", color: "bg-yellow-400" },
  { label: "Strong", color: "bg-green-500" },
] as const;

export function AuthModal({
  mode,
  onClose,
  onLogin,
  onRegister,
  mockJWT,
  isLoggedIn,
}: Props) {
  const [activeMode, setActiveMode] = useState(mode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(isLoggedIn ?? false);
  const [copied, setCopied] = useState(false);

  const strength = getStrength(password);
  const { label: strengthLabel, color: strengthColor } = strengthMeta[strength];
  const truncatedJWT = mockJWT
    ? `${mockJWT.slice(0, 40)}...`
    : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyX...";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = () => {
    if (activeMode === "login") {
      if (!email || !password) return toast.error("Please fill in all fields");
      setJustLoggedIn(true);
      onLogin(email);
    } else {
      if (!name || !email || !password)
        return toast.error("Please fill in all fields");
      if (password !== confirm) return toast.error("Passwords don't match");
      if (strength < 2) return toast.error("Password is too weak");
      onRegister();
    }
  };

  const copyJWT = () => {
    if (mockJWT) navigator.clipboard.writeText(mockJWT).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="auth.dialog"
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
        className="relative w-full max-w-md rounded-2xl p-6 border border-border/30 z-10 animate-fade-in-up"
        style={{
          background: "rgba(10,10,26,0.99)",
          backdropFilter: "blur(24px)",
        }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth"
          onClick={onClose}
          data-ocid="auth.close_button"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Post-login JWT display */}
        {justLoggedIn ? (
          <div className="text-center" data-ocid="auth.success_state">
            <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-1">
              Signed in!
            </h2>
            <p className="text-xs text-muted-foreground mb-5">
              Session secured with JSON Web Token
            </p>
            <div
              className="p-3 rounded-xl border border-border/20 mb-4"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-3.5 h-3.5 text-green-400 shrink-0" />
                <span className="text-xs text-green-400 font-semibold">
                  Auth Token (JWT)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs text-muted-foreground font-mono break-all flex-1">
                  {truncatedJWT}
                </code>
                <button
                  type="button"
                  className="shrink-0 p-1 rounded hover:bg-muted/10 text-muted-foreground hover:text-foreground transition-smooth"
                  onClick={copyJWT}
                  data-ocid="auth.copy_jwt_button"
                  aria-label="Copy JWT"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              {copied && <p className="text-xs text-green-400 mt-1">Copied!</p>}
            </div>
            <p className="text-xs text-muted-foreground">
              🔒 Token is stored securely in memory only — never in
              localStorage.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-bold text-gradient mb-1">
              {activeMode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {activeMode === "login"
                ? "Sign in to your EventFinder account"
                : "Join 3.2M event lovers"}
            </p>

            {/* Tabs */}
            <div className="flex rounded-xl overflow-hidden border border-border/30 mb-5">
              {(["login", "register"] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-smooth ${activeMode === m ? "gradient-hero text-white" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setActiveMode(m)}
                  data-ocid={`auth.${m}_tab`}
                >
                  {m === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {activeMode === "register" && (
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-muted/10 border-border/30"
                  data-ocid="auth.name_input"
                />
              )}
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/10 border-border/30"
                data-ocid="auth.email_input"
              />
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted/10 border-border/30 pr-10"
                  data-ocid="auth.password_input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {activeMode === "register" && (
                <>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-muted/10 border-border/30"
                    data-ocid="auth.confirm_password_input"
                  />
                  {password.length > 0 && (
                    <div>
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-smooth ${i <= strength ? strengthColor : "bg-muted/30"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Strength:{" "}
                        <span className="font-semibold">{strengthLabel}</span>
                      </p>
                    </div>
                  )}
                </>
              )}

              {activeMode === "login" && (
                <button
                  type="button"
                  className="text-xs text-accent hover:underline block ml-auto"
                  data-ocid="auth.forgot_password_link"
                >
                  Forgot password?
                </button>
              )}

              <Button
                type="button"
                className="w-full gradient-hero text-white border-0 hover:opacity-90 font-semibold"
                onClick={handleSubmit}
                data-ocid="auth.submit_button"
              >
                {activeMode === "login" ? "Sign In" : "Create Account"}
              </Button>
            </div>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              🔒 Your data is encrypted and never shared with third parties.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
