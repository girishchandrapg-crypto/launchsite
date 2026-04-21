import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Flame, Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  inputSanitizeError: boolean;
  rateLimitWarning: boolean;
}

export function HeroSection({
  searchQuery,
  onSearch,
  inputSanitizeError,
  rateLimitWarning,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-16 overflow-hidden">
      {/* Gradient background layers */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/assets/generated/event-hero.dim_1200x600.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1a]/40 to-[#0a0a1a]" />

      <div className="relative max-w-4xl mx-auto px-4 py-24 text-center">
        <Badge className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs font-semibold px-3 py-1.5">
          <Flame className="w-3 h-3 mr-1" />
          22 new events added this week
        </Badge>

        <h1 className="font-display text-5xl md:text-7xl font-black text-foreground mb-4 leading-tight">
          Discover <span className="text-gradient">Amazing Events</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Concerts, hackathons, food festivals, art shows — discover what's
          happening across India right now.
        </p>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search events, cities, artists, categories..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-base rounded-2xl border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-smooth"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(16px)",
            }}
            data-ocid="hero.search_input"
          />
        </div>

        {inputSanitizeError && (
          <p
            className="mt-2 text-sm text-destructive flex items-center gap-1 justify-center"
            data-ocid="search.error_state"
          >
            <AlertTriangle className="w-4 h-4" />
            No scripts allowed in search
          </p>
        )}
        {rateLimitWarning && (
          <p
            className="mt-2 text-sm text-orange-400 flex items-center gap-1 justify-center"
            data-ocid="search.loading_state"
          >
            ⚠️ Slow down! Too many requests
          </p>
        )}
      </div>
    </section>
  );
}
