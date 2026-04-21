import type { Organizer } from "@/types/events";

export const mockOrganizers: Organizer[] = [
  {
    id: "org-1",
    name: "SoundWave Events",
    avatar: "https://picsum.photos/seed/org1/80/80",
    followers: 128400,
    isVerified: true,
    eventsHosted: 342,
  },
  {
    id: "org-2",
    name: "TechHub India",
    avatar: "https://picsum.photos/seed/org2/80/80",
    followers: 54200,
    isVerified: false,
    eventsHosted: 89,
  },
  {
    id: "org-3",
    name: "Gourmet Circle",
    avatar: "https://picsum.photos/seed/org3/80/80",
    followers: 23800,
    isVerified: false,
    eventsHosted: 47,
  },
  {
    id: "org-4",
    name: "ArtPulse Collective",
    avatar: "https://picsum.photos/seed/org4/80/80",
    followers: 31600,
    isVerified: false,
    eventsHosted: 65,
  },
];
