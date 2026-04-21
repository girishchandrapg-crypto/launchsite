import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event, ViewMode } from "@/types/events";
import { EventCard, EventRow } from "./EventCard";

function EventSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/5"
      style={{ background: "rgba(15,15,35,0.8)" }}
    >
      <Skeleton className="h-44 w-full shimmer" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-3/4 shimmer" />
        <Skeleton className="h-3 w-full shimmer" />
        <Skeleton className="h-3 w-2/3 shimmer" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 flex-1 shimmer" />
        </div>
      </div>
    </div>
  );
}

interface EventGridProps {
  events: Event[];
  isLoading: boolean;
  viewMode: ViewMode;
  likedEvents: Set<string>;
  onLike: (id: string) => void;
  onSelect: (event: Event) => void;
  onTicket: (id: string) => void;
  onReport: (id: string) => void;
  onClearFilters: () => void;
}

export function EventGrid({
  events,
  isLoading,
  viewMode,
  likedEvents,
  onLike,
  onSelect,
  onTicket,
  onReport,
  onClearFilters,
}: EventGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-ocid="events.loading_state"
      >
        {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
          <EventSkeleton key={k} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-24" data-ocid="events.empty_state">
        <p className="text-5xl mb-4">🔍</p>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          No events found
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Try a different search term or category
        </p>
        <Button
          type="button"
          variant="outline"
          className="border-border/30"
          onClick={onClearFilters}
          data-ocid="events.clear_filters_button"
        >
          Clear filters
        </Button>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            liked={likedEvents.has(event.id)}
            onLike={onLike}
            onSelect={onSelect}
            onTicket={onTicket}
            onReport={onReport}
            index={i}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {events.map((event, i) => (
        <EventRow
          key={event.id}
          event={event}
          liked={likedEvents.has(event.id)}
          onLike={onLike}
          onSelect={onSelect}
          onTicket={onTicket}
          onReport={onReport}
          index={i}
        />
      ))}
    </div>
  );
}
