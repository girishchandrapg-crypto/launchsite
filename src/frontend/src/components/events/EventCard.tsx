import { Button } from "@/components/ui/button";
import type { Event } from "@/types/events";
import {
  AlertTriangle,
  Calendar,
  Heart,
  MapPin,
  Shield,
  Ticket,
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

const categoryEmojis: Record<string, string> = {
  music: "🎵",
  technology: "💻",
  food: "🍽️",
  art: "🎨",
  sports: "⚽",
  comedy: "😂",
  wellness: "🧘",
  gaming: "🎮",
  business: "💼",
};

function formatPrice(price: number, isFree: boolean) {
  if (isFree) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatAttendees(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

interface EventCardProps {
  event: Event;
  liked: boolean;
  onLike: (id: string) => void;
  onSelect: (event: Event) => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
  index: number;
}

export function EventCard({
  event,
  liked,
  onLike,
  onSelect,
  onTicket,
  onReport,
  index,
}: EventCardProps) {
  const catColor =
    categoryColors[event.category] ?? "bg-muted/40 text-foreground";
  const catEmoji = categoryEmojis[event.category] ?? "🎪";
  const categoryLabel =
    event.category.charAt(0).toUpperCase() + event.category.slice(1);

  return (
    <div
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer animate-fade-in-up border border-white/5 hover:border-primary/30 hover:neon-glow transition-smooth"
      style={{
        background: "rgba(15,15,35,0.8)",
        animationDelay: `${index * 0.05}s`,
      }}
      data-ocid={`events.item.${index + 1}`}
      tabIndex={0}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(event)}
      aria-label={`View details for ${event.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColor}`}
          >
            {catEmoji} {categoryLabel}
          </span>
          {event.isLive && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/80 text-white border border-red-400/30 flex items-center gap-1 animate-pulse-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE NOW
            </span>
          )}
          {event.isFree && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/80 text-white border border-green-400/30">
              FREE
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          type="button"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-smooth backdrop-blur-sm ${
            liked
              ? "bg-red-500 text-white"
              : "bg-black/40 text-white/70 hover:bg-red-500/80"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onLike(event.id);
          }}
          data-ocid={`events.toggle_like.${index + 1}`}
          aria-label={liked ? "Unlike event" : "Like event"}
          aria-pressed={liked}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-base line-clamp-1 mb-1 group-hover:text-primary transition-smooth">
          {event.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {event.description}
        </p>

        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
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
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {event.location}
              {event.city !== "Online" ? `, ${event.city}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span>{formatAttendees(event.attendees)}+ attending</span>
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={event.organizer.avatar}
            alt={event.organizer.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-xs text-muted-foreground truncate">
            {event.organizer.name}
          </span>
          {event.organizer.isVerified && (
            <Shield
              className="w-3.5 h-3.5 text-blue-400 shrink-0"
              aria-label="Verified organizer"
            />
          )}
        </div>

        {/* Footer */}
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
              data-ocid={`events.report_button.${index + 1}`}
              aria-label="Report event"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>
            <Button
              type="button"
              size="sm"
              className="gradient-hero text-white border-0 hover:opacity-90 text-xs font-semibold px-3 h-7"
              onClick={(e) => {
                e.stopPropagation();
                onTicket(event.id);
              }}
              data-ocid={`events.get_tickets_button.${index + 1}`}
            >
              <Ticket className="w-3 h-3 mr-1" />
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// List row variant
interface EventRowProps {
  event: Event;
  liked: boolean;
  onLike: (id: string) => void;
  onSelect: (event: Event) => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
  index: number;
}

export function EventRow({
  event,
  liked,
  onLike,
  onSelect,
  onTicket,
  onReport,
  index,
}: EventRowProps) {
  return (
    <div
      className="glass-card rounded-xl overflow-hidden group cursor-pointer animate-fade-in-up flex border border-white/5 hover:border-primary/30 transition-smooth"
      style={{
        background: "rgba(15,15,35,0.8)",
        animationDelay: `${index * 0.04}s`,
      }}
      data-ocid={`events.item.${index + 1}`}
      tabIndex={0}
      onClick={() => onSelect(event)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(event)}
      aria-label={`View details for ${event.title}`}
    >
      <div className="relative w-32 shrink-0">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {event.isLive && (
          <span className="absolute top-2 left-2 text-xs font-bold px-1.5 py-0.5 rounded bg-red-500/80 text-white animate-pulse-glow">
            LIVE
          </span>
        )}
      </div>
      <div className="p-4 flex flex-1 items-center gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[event.category] ?? "bg-muted/30 text-foreground"}`}
            >
              {event.category}
            </span>
            {event.isFree && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                FREE
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-foreground text-sm truncate">
            {event.title}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {event.city}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-sm font-bold ${event.isFree ? "text-green-400" : "text-foreground"}`}
          >
            {formatPrice(event.price, event.isFree)}
          </span>
          <button
            type="button"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
            onClick={(e) => {
              e.stopPropagation();
              onReport(event.id);
            }}
            data-ocid={`events.report_button.${index + 1}`}
            aria-label="Report event"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
              liked
                ? "bg-red-500 text-white"
                : "bg-muted/20 text-muted-foreground hover:bg-red-500/80"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onLike(event.id);
            }}
            data-ocid={`events.toggle_like.${index + 1}`}
            aria-label="Toggle like"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
          </button>
          <Button
            type="button"
            size="sm"
            className="gradient-hero text-white border-0 hover:opacity-90 text-xs h-7 px-3"
            onClick={(e) => {
              e.stopPropagation();
              onTicket(event.id);
            }}
            data-ocid={`events.get_tickets_button.${index + 1}`}
          >
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}
