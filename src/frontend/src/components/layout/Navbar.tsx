import { Button } from "@/components/ui/button";
import type { AuthModal } from "@/hooks/useEventFinder";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthOpen: (modal: AuthModal) => void;
  onLogout: () => void;
  mockJWT: string;
  profilePrivate: boolean;
  onTogglePrivacy: (val: boolean) => void;
}

const navLinks = [
  { label: "Explore", href: "#explore" },
  { label: "Trending", href: "#trending" },
  { label: "Organizers", href: "#organizers" },
];

export function Navbar({
  isLoggedIn,
  onAuthOpen,
  onLogout,
  mockJWT,
  profilePrivate,
  onTogglePrivacy,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: "rgba(10, 10, 26, 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-2 group"
          onClick={() => scrollTo("#hero")}
          data-ocid="nav.logo"
          aria-label="EventFinder home"
        >
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center shadow-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-gradient">
            EventFinder
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-smooth rounded-lg hover:bg-muted/20"
              data-ocid={`nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs border-border/40 hover:bg-muted/20 text-muted-foreground"
            onClick={() => scrollTo("#post-event")}
            data-ocid="nav.post_event_button"
          >
            Post Event
          </Button>
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-white text-xs font-bold transition-smooth hover:scale-105"
                onClick={() => setProfileOpen(!profileOpen)}
                data-ocid="nav.profile_button"
                aria-label="User profile"
              >
                JD
              </button>
              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border/30 shadow-elevated p-3 z-50"
                  style={{
                    background: "rgba(10,10,26,0.95)",
                    backdropFilter: "blur(16px)",
                  }}
                  data-ocid="nav.profile_dropdown"
                >
                  <div className="px-2 py-1 mb-2 border-b border-border/20">
                    <p className="text-sm font-semibold text-foreground">
                      John Doe
                    </p>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {mockJWT.slice(0, 40)}...
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-muted/10">
                    <span className="text-sm text-foreground">
                      Private Profile
                    </span>
                    <button
                      type="button"
                      className={`relative w-10 h-5 rounded-full transition-smooth ${profilePrivate ? "bg-primary" : "bg-muted"}`}
                      onClick={() => onTogglePrivacy(!profilePrivate)}
                      data-ocid="nav.privacy_toggle"
                      role="switch"
                      aria-checked={profilePrivate}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-smooth ${profilePrivate ? "translate-x-5" : ""}`}
                      />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="w-full text-left px-2 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-smooth"
                    onClick={() => {
                      onLogout();
                      setProfileOpen(false);
                    }}
                    data-ocid="nav.logout_button"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              type="button"
              size="sm"
              className="text-xs gradient-hero text-white border-0 hover:opacity-90 font-semibold"
              onClick={() => onAuthOpen({ open: true, mode: "login" })}
              data-ocid="nav.login_button"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg hover:bg-muted/20 text-muted-foreground transition-smooth"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.hamburger_button"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-t border-border/20 py-4 px-4 flex flex-col gap-2"
          style={{
            background: "rgba(10,10,26,0.98)",
            backdropFilter: "blur(16px)",
          }}
          data-ocid="nav.mobile_drawer"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-muted/20 rounded-lg transition-smooth"
              data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border/20">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => scrollTo("#post-event")}
            >
              Post Event
            </Button>
            {isLoggedIn ? (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="flex-1 text-xs"
                onClick={onLogout}
                data-ocid="nav.mobile_logout_button"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="flex-1 text-xs gradient-hero text-white border-0"
                onClick={() => {
                  onAuthOpen({ open: true, mode: "login" });
                  setMenuOpen(false);
                }}
                data-ocid="nav.mobile_login_button"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
