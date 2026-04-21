export type EventCategory =
  | "music"
  | "technology"
  | "food"
  | "art"
  | "sports"
  | "comedy"
  | "wellness"
  | "gaming"
  | "business";

export type EventFormat = "in-person" | "online" | "hybrid";

export type EventStatus = "upcoming" | "live" | "past";

export interface Organizer {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  isVerified: boolean;
  eventsHosted: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  city: string;
  price: number;
  isFree: boolean;
  isLive: boolean;
  status: EventStatus;
  isOnline: boolean;
  attendees: number;
  maxAttendees: number;
  organizer: Organizer;
  tags: string[];
  format: EventFormat;
  image: string;
  likeCount: number;
}

export interface Category {
  id: EventCategory | "all";
  name: string;
  emoji: string;
  color: string;
}

export type SortOption =
  | "date-newest"
  | "date-oldest"
  | "price-low"
  | "price-high"
  | "popularity";

export type ViewMode = "grid" | "list";
