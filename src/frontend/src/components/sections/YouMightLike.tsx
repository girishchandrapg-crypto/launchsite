import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockEvents } from "@/data/mockEvents";
import type { Event } from "@/types/events";
import {
  AlertTriangle,
  Calendar,
  Heart,
  MapPin,
  Shield,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";

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

function formatPrice(price: number, isFree: boolean) {
  if (isFree) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatAttendees(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

const recommendedEvents = mockEvents
  .filter((e) => e.category === "music" || e.category === "technology")
  .slice(0, 6);

interface YouMightLikeProps {
  likedEvents: Set<string>;
  onLike: (id: string) => void;
  onSelectEvent: (event: Event) => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
}

function RecommendedCard({
  event,
  liked,
  onLike,
  onSelect,
  onTicket,
  onReport,
  index,
}: {
  event: Event;
  liked: boolean;
  onLike: (id: string) => void;
  onSelect: (event: Event) => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
  index: number;
}) {
  const catColor =
    categoryColors[event.category] ?? "bg-muted/40 text-foreground";
  return (
    <div
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-primary/30 transition-smooth"
      style={{ background: "rgba(15,15,35,0.8)" }}
      data-ocid={`you_might_like.item.${index + 1}`}
      tabIndex={0}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(event)}
      aria-label={`View details for ${event.title}`}
    >
      <div className="relative overflow-hidden h-40">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}
          >
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
          {event.isLive && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/80 text-white border border-red-400/30 flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              LIVE
            </span>
          )}
          {event.isFree && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/80 text-white border border-green-400/30">
              FREE
            </span>
          )}
        </div>
        <button
          type="button"
          className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-smooth backdrop-blur-sm ${liked ? "bg-red-500 text-white" : "bg-black/40 text-white/70 hover:bg-red-500/80"}`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(event.id);
          }}
          data-ocid={`you_might_like.toggle_like.${index + 1}`}
          aria-label="Toggle like"
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-sm line-clamp-1 mb-1 group-hover:text-primary transition-smooth">
          {event.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {event.description}
        </p>

        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}{" "}
              · {event.time}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">
              {event.location}
              {event.city !== "Online" ? `, ${event.city}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3 h-3 shrink-0" />
            <span>{formatAttendees(event.attendees)}+ attending</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-4 h-4 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground truncate">
            {event.organizer.name}
          </span>
          {event.organizer.isVerified && (
            <Shield className="w-3 h-3 text-blue-400 shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${event.isFree ? "text-green-400" : "text-foreground"}`}
          >
            {formatPrice(event.price, event.isFree)}
          </span>
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
              onClick={(e) => {
                e.stopPropagation();
                onReport(event.id);
              }}
              data-ocid={`you_might_like.report_button.${index + 1}`}
              aria-label="Report event"
            >
              <AlertTriangle className="w-3 h-3" />
            </button>
            <Button
              type="button"
              size="sm"
              className="gradient-hero text-white border-0 hover:opacity-90 text-xs font-semibold px-3 h-7"
              onClick={(e) => {
                e.stopPropagation();
                onTicket(event.id);
              }}
              data-ocid={`you_might_like.get_tickets_button.${index + 1}`}
            >
              <Ticket className="w-3 h-3 mr-1" />
              Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function YouMightLike({
  likedEvents,
  onLike,
  onSelectEvent,
  onTicket,
  onReport,
}: YouMightLikeProps) {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto border-t border-border/10">
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-5 h-5 text-accent" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          You Might Like
        </h2>
        <Badge
          variant="outline"
          className="text-xs border-accent/30 text-accent"
        >
          Based on Music &amp; Tech
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Handpicked events based on your interest in Music &amp; Technology
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommendedEvents.map((event, i) => (
          <RecommendedCard
            key={`rec-${event.id}`}
            event={event}
            liked={likedEvents.has(event.id)}
            onLike={onLike}
            onSelect={onSelectEvent}
            onTicket={onTicket}
            onReport={onReport}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
