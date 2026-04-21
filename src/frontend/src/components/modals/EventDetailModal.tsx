import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Event } from "@/types/events";
import {
  AlertTriangle,
  Calendar,
  MapPin,
  Share2,
  Shield,
  Star,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useEffect } from "react";

function formatPrice(price: number, isFree: boolean) {
  if (isFree) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

function formatAttendees(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

const schedule = [
  { time: "10:00 AM", label: "Doors Open & Registration" },
  { time: "11:30 AM", label: "Opening Act / Welcome Address" },
  { time: "1:00 PM", label: "Main Event Begins" },
  { time: "4:30 PM", label: "Closing Ceremony & Networking" },
];

const speakers = [
  { name: "Priya Sharma", role: "Headliner", seed: "priya" },
  { name: "Rohit Mehta", role: "Special Guest", seed: "rohit" },
  { name: "Ananya Iyer", role: "MC / Host", seed: "ananya" },
];

interface Props {
  event: Event;
  onClose: () => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
}

export function EventDetailModal({
  event,
  onClose,
  onTicket,
  onReport,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const catColors: Record<string, string> = {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      data-ocid="event_detail.dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#0a0a1a]/95 backdrop-blur-md"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl border border-white/10 z-10 animate-fade-in-up"
        style={{
          background: "rgba(12,12,30,0.99)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Hero image */}
        <div className="relative h-56 sm:h-72 shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <button
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:bg-black/80 transition-smooth"
            onClick={onClose}
            data-ocid="event_detail.close_button"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColors[event.category] ?? "bg-muted/40 text-foreground"}`}
            >
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
            {event.isLive && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/90 text-white border border-red-400/30 flex items-center gap-1 animate-pulse">
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
        </div>

        <div className="p-5 sm:p-6">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="font-display text-xl sm:text-2xl font-black text-foreground leading-tight">
              {event.title}
            </h2>
            <span className="text-xl font-bold text-gradient shrink-0">
              {formatPrice(event.price, event.isFree)}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Details grid */}
          <div
            className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl border border-border/20"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            {[
              {
                Icon: Calendar,
                label: "Date & Time",
                value: `${new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })} · ${event.time}`,
              },
              {
                Icon: MapPin,
                label: "Location",
                value: `${event.location}, ${event.city}`,
              },
              {
                Icon: Users,
                label: "Attendees",
                value: `${formatAttendees(event.attendees)} / ${event.maxAttendees >= 999999 ? "Unlimited" : formatAttendees(event.maxAttendees)}`,
              },
              {
                Icon: Star,
                label: "Format",
                value:
                  event.format.charAt(0).toUpperCase() + event.format.slice(1),
              },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2 min-w-0">
                <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xs sm:text-sm text-foreground font-medium break-words">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              Schedule
            </h3>
            <div className="space-y-2">
              {schedule.map((slot) => (
                <div
                  key={slot.time}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-border/10"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="text-xs font-mono text-accent shrink-0 w-20">
                    {slot.time}
                  </span>
                  <span className="text-sm text-foreground">{slot.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Speakers */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
              Artists / Speakers
            </h3>
            <div className="flex gap-3 flex-wrap">
              {speakers.map((sp) => (
                <div
                  key={sp.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/20"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <img
                    src={`https://picsum.photos/seed/${sp.seed}/40/40`}
                    alt={sp.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary/20"
                  />
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {sp.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{sp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer */}
          <div
            className="flex items-center gap-3 mb-5 p-3 rounded-xl border border-border/20"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <img
              src={event.organizer.avatar}
              alt={event.organizer.name}
              className="w-10 h-10 rounded-full border border-primary/20"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-semibold text-foreground">
                  {event.organizer.name}
                </p>
                {event.organizer.isVerified && (
                  <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {formatAttendees(event.organizer.followers)} followers
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {event.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-border/30 text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="h-28 rounded-xl mb-5 border border-border/20 flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="text-center">
              <MapPin className="w-7 h-7 text-muted-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Map Preview</p>
              <p className="text-xs text-muted-foreground/60">
                {event.location}, {event.city}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap">
            <Button
              type="button"
              className="flex-1 gradient-hero text-white border-0 hover:opacity-90 font-semibold min-w-[120px]"
              onClick={() => onTicket(event.id)}
              data-ocid="event_detail.get_tickets_button"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Get Tickets
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-muted/10"
              onClick={() =>
                navigator.share?.({
                  title: event.title,
                  url: window.location.href,
                })
              }
              data-ocid="event_detail.share_button"
              aria-label="Share event"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-muted/10"
              onClick={() => {
                const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(event.title)}&dates=${event.date.replace(/-/g, "")}`;
                window.open(url, "_blank");
              }}
              data-ocid="event_detail.add_to_calendar_button"
              aria-label="Add to calendar"
            >
              <Calendar className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="border-border/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              onClick={() => onReport(event.id)}
              data-ocid="event_detail.report_button"
              aria-label="Report event"
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
