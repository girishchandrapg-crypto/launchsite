import { trendingEvents } from "@/data/mockEvents";
import type { Event } from "@/types/events";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useRef } from "react";

function formatPrice(price: number, isFree: boolean) {
  if (isFree) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

const categoryColors: Record<string, string> = {
  music: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  food: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  art: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  sports: "bg-green-500/20 text-green-300 border-green-500/30",
  comedy: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  wellness: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  gaming: "bg-red-500/20 text-red-300 border-red-500/30",
  business: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

interface TrendingSectionProps {
  onSelectEvent: (event: Event) => void;
}

export function TrendingSection({ onSelectEvent }: TrendingSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <section id="trending" className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            Trending This Week 🔥
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth"
            style={{ background: "rgba(255,255,255,0.04)" }}
            aria-label="Scroll left"
            data-ocid="trending.scroll_left_button"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth"
            style={{ background: "rgba(255,255,255,0.04)" }}
            aria-label="Scroll right"
            data-ocid="trending.scroll_right_button"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {trendingEvents.map((event, i) => {
          const catColor =
            categoryColors[event.category] ?? "bg-muted/40 text-foreground";
          return (
            <button
              key={event.id}
              type="button"
              className="glass-card rounded-xl overflow-hidden shrink-0 w-60 cursor-pointer group border border-white/5 hover:border-orange-400/40 transition-smooth hover:neon-glow text-left"
              style={{
                background: "rgba(15,15,35,0.85)",
                borderLeft: "3px solid",
                borderImage: "linear-gradient(180deg, #f97316, #7c3aed) 1",
              }}
              onClick={() => onSelectEvent(event)}
              data-ocid={`trending.item.${i + 1}`}
            >
              <div className="relative h-[120px] overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${event.id}/200/120`}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-2 left-2 bg-orange-500/90 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  🔥 #{i + 1}
                </div>
                {event.isLive && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/80 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    LIVE
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-foreground line-clamp-1 mb-1.5 group-hover:text-orange-300 transition-smooth">
                  {event.title}
                </p>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catColor}`}
                  >
                    {event.category.charAt(0).toUpperCase() +
                      event.category.slice(1)}
                  </span>
                  <span
                    className={`text-xs font-bold ${event.isFree ? "text-green-400" : "text-foreground"}`}
                  >
                    {formatPrice(event.price, event.isFree)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  · {event.city}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
