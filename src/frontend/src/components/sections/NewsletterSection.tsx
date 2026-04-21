import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Mail, Send } from "lucide-react";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      className="py-20 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.10) 50%, rgba(6,182,212,0.15) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      data-ocid="newsletter.section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />

      <div className="max-w-xl mx-auto text-center relative">
        <div className="flex justify-center mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20"
            style={{ background: "rgba(124,58,237,0.15)" }}
          >
            <Mail className="w-7 h-7 text-primary" />
          </div>
        </div>

        <h2 className="font-display text-4xl font-black text-foreground mb-3">
          Stay in the <span className="text-gradient">Loop</span>
        </h2>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Get the hottest events, exclusive early-bird tickets, and curated
          picks delivered straight to your inbox every week.
        </p>

        {submitted ? (
          <div
            className="flex flex-col items-center gap-3 py-8"
            data-ocid="newsletter.success_state"
          >
            <CheckCircle className="w-14 h-14 text-green-400" />
            <p className="font-display text-xl font-bold text-foreground">
              You&apos;re subscribed! 🎉
            </p>
            <p className="text-sm text-muted-foreground">
              Welcome aboard! Expect your first digest within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className="flex-1 h-12 bg-white/5 border-border/30 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
              data-ocid="newsletter.email_input"
              aria-label="Email address"
            />
            <Button
              type="submit"
              className="h-12 px-6 gradient-hero text-white border-0 hover:opacity-90 font-semibold shrink-0 flex items-center gap-2"
              data-ocid="newsletter.submit_button"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </Button>
          </form>
        )}

        {error && (
          <p
            className="mt-2 text-sm text-destructive text-left"
            data-ocid="newsletter.field_error"
          >
            {error}
          </p>
        )}

        {!submitted && (
          <p className="mt-4 text-xs text-muted-foreground">
            🔒 No spam, ever. Unsubscribe anytime with one click.
          </p>
        )}
      </div>
    </section>
  );
}
