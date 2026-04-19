import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden bg-foreground"
    >
      {/* Geometric teal accent stripes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary diagonal stripe */}
        <div
          className="absolute -right-32 top-0 w-[55%] h-full bg-accent/20 origin-top-right"
          style={{ transform: "skewX(-12deg)" }}
        />
        {/* Secondary stripe — offset for depth */}
        <div
          className="absolute -right-16 top-0 w-[30%] h-full bg-accent/30 origin-top-right"
          style={{ transform: "skewX(-12deg)" }}
        />
        {/* Teal glow accent block */}
        <div
          className="absolute right-0 top-0 w-[42%] h-full bg-accent/10"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        {/* Subtle dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.98 0 0) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column — copy */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/50 bg-accent/10 text-accent text-sm font-body font-medium tracking-wide">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Now in Public Beta
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              data-ocid="hero.headline"
              className="font-display text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-primary-foreground"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Launch Your <span className="text-accent">Vision</span> Into the
              World
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              data-ocid="hero.subheadline"
              className="font-body text-lg sm:text-xl text-primary-foreground/70 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The all-in-one platform to build, grow, and scale your business.
              Start for free — no credit card required.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25 transition-smooth font-body font-semibold text-base px-8 gap-2 group"
                onClick={() => scrollTo("contact")}
              >
                Get Started Free
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="border-primary-foreground/25 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-smooth font-body font-semibold text-base px-8 gap-2"
                onClick={() => scrollTo("features")}
              >
                <Play className="size-4 fill-current" />
                See How It Works
              </Button>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              className="flex items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex -space-x-2">
                {[
                  { initials: "SK", hue: "180" },
                  { initials: "AM", hue: "190" },
                  { initials: "JR", hue: "175" },
                  { initials: "PL", hue: "200" },
                ].map(({ initials, hue }) => (
                  <div
                    key={initials}
                    className="size-8 rounded-full border-2 border-foreground flex items-center justify-center text-[10px] font-semibold font-body text-accent-foreground"
                    style={{
                      background: `oklch(0.54 0.16 ${hue})`,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/60 font-body">
                <span className="text-primary-foreground font-semibold">
                  12,400+
                </span>{" "}
                teams already building
              </p>
            </motion.div>
          </div>

          {/* Right column — visual dashboard mockup */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Dashboard card */}
            <div className="relative w-full max-w-md rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm p-6 shadow-2xl shadow-black/40">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 mb-5">
                <span className="size-3 rounded-full bg-destructive/60" />
                <span className="size-3 rounded-full bg-accent/60" />
                <span className="size-3 rounded-full bg-accent" />
                <div className="ml-3 flex-1 h-5 rounded bg-primary-foreground/10" />
              </div>

              {/* Stat cards row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Revenue", value: "$48.2K", up: true },
                  { label: "Users", value: "8,341", up: true },
                  { label: "Churn", value: "1.2%", up: false },
                ].map(({ label, value, up }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-primary-foreground/8 border border-primary-foreground/10 p-3"
                  >
                    <p className="text-[10px] text-primary-foreground/50 font-body mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-semibold font-display text-primary-foreground">
                      {value}
                    </p>
                    <p
                      className={`text-[10px] font-body mt-0.5 ${up ? "text-accent" : "text-destructive/80"}`}
                    >
                      {up ? "↑ 12%" : "↓ 0.3%"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div className="rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
                <p className="text-[11px] text-primary-foreground/50 font-body mb-3">
                  Monthly growth
                </p>
                <div className="flex items-end gap-1.5 h-20">
                  {[
                    { month: "jan", h: 40 },
                    { month: "feb", h: 55 },
                    { month: "mar", h: 45 },
                    { month: "apr", h: 70 },
                    { month: "may", h: 60 },
                    { month: "jun", h: 80 },
                    { month: "jul", h: 65 },
                    { month: "aug", h: 90 },
                    { month: "sep", h: 75 },
                    { month: "oct", h: 95 },
                    { month: "nov", h: 85 },
                    { month: "dec", h: 100 },
                  ].map(({ month, h }, i) => (
                    <div
                      key={month}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          month === "dec"
                            ? "oklch(0.54 0.16 180)"
                            : `oklch(0.54 0.16 180 / ${0.25 + (i / 11) * 0.35})`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="mt-4 space-y-2">
                {[
                  { text: "New user signup", time: "2m ago" },
                  { text: "Payment received $299", time: "5m ago" },
                  { text: "Campaign launched", time: "12m ago" },
                ].map(({ text, time }) => (
                  <div
                    key={text}
                    className="flex items-center justify-between rounded-lg bg-primary-foreground/5 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="text-[11px] text-primary-foreground/70 font-body">
                        {text}
                      </span>
                    </div>
                    <span className="text-[10px] text-primary-foreground/40 font-body">
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-6 rounded-xl border border-accent/30 bg-accent/15 backdrop-blur-sm px-4 py-2.5 shadow-lg">
              <p className="text-xs text-accent font-body font-semibold">
                ↑ 34% growth this month
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
