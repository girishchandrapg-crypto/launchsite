import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/types";
import { Menu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-subtle"
          : "bg-card border-b border-border/50"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToId("#hero")}
          className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-accent transition-colors duration-200"
          data-ocid="nav.logo"
        >
          <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-accent-foreground" />
          </span>
          ApexFlow
        </button>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToId(link.href)}
              className="px-3 py-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted"
              data-ocid={`nav.${link.label.toLowerCase()}_link`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold shadow-subtle transition-smooth"
            onClick={() => scrollToId("#contact")}
            data-ocid="nav.cta_button"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
              data-ocid="nav.hamburger_button"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-card">
            <div className="flex flex-col gap-1 mt-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => {
                    scrollToId(link.href);
                    setOpen(false);
                  }}
                  className="px-4 py-3 text-base font-body text-foreground hover:text-accent hover:bg-muted rounded-lg transition-colors duration-200 text-left"
                  data-ocid={`mobile_nav.${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-4 px-4">
                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold"
                  onClick={() => {
                    scrollToId("#contact");
                    setOpen(false);
                  }}
                  data-ocid="mobile_nav.cta_button"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
