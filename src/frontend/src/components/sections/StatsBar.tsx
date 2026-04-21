import { CalendarDays, Globe, LayoutGrid, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
}

const statsConfig: StatItem[] = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    target: 12400,
    suffix: "+",
    label: "Events",
  },
  {
    icon: <Users className="w-6 h-6" />,
    target: 3.2,
    suffix: "M",
    label: "Attendees",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    target: 180,
    suffix: "",
    label: "Cities",
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    target: 50,
    suffix: "+",
    label: "Categories",
  },
];

function AnimatedCounter({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setValue(Number((eased * target).toFixed(target < 10 ? 1 : 0)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target]);

  const display =
    target < 10 ? value.toFixed(1) : Math.round(value).toLocaleString("en-IN");

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 px-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 50%, rgba(6,182,212,0.12) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 relative">
        {statsConfig.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center group"
            data-ocid={`stats.item.${i + 1}`}
          >
            <div className="flex justify-center mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-smooth"
                style={{ background: "rgba(124,58,237,0.1)" }}
              >
                {stat.icon}
              </div>
            </div>
            <p className="font-display text-3xl md:text-4xl font-black text-gradient mb-1 tabular-nums">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                started={started}
              />
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
