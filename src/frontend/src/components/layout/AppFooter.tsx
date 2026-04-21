import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Instagram, Mail, Twitter, Youtube, Zap } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { Icon: Github, label: "GitHub", href: "https://github.com" },
];

const footerLinks = [
  "Events Near Me",
  "Trending This Week",
  "Free Events",
  "Online Events",
  "Past Events",
];

const legalLinks = ["Privacy Policy", "Terms of Use", "Cookie Policy"];

export function AppFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      id="footer"
      className="border-t border-border/20 mt-24"
      style={{ background: "rgba(10,10,26,0.98)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-gradient">
                EventFinder
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              India's most vibrant event discovery platform. Find concerts,
              hackathons, food festivals, and experiences that move you.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth text-left"
                    onClick={() =>
                      document
                        .querySelector("#explore")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              <Mail className="inline w-4 h-4 mr-1 -mt-0.5" /> Stay Updated
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Get top events in your city every Friday. No spam, ever.
            </p>
            {subscribed ? (
              <p
                className="text-sm text-accent font-semibold"
                data-ocid="footer.success_state"
              >
                🎉 You're subscribed!
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="text-sm bg-muted/10 border-border/30 text-foreground placeholder:text-muted-foreground"
                  data-ocid="footer.newsletter_input"
                />
                <Button
                  type="button"
                  size="sm"
                  className="gradient-hero text-white border-0 hover:opacity-90 text-xs font-semibold"
                  onClick={handleSubscribe}
                  data-ocid="footer.subscribe_button"
                >
                  Subscribe →
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground/60 mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#footer"
                className="text-xs text-muted-foreground hover:text-foreground transition-smooth"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
