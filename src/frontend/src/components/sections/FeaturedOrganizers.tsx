import { mockOrganizers } from "@/data/mockOrganizers";
import type { Organizer } from "@/types/events";
import { Check, Star } from "lucide-react";
import { useState } from "react";

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

const gradients = [
  "from-purple-600 to-blue-500",
  "from-blue-600 to-cyan-500",
  "from-pink-600 to-orange-500",
  "from-teal-600 to-green-500",
];

function OrganizerCard({
  org,
  index,
}: {
  org: Organizer;
  index: number;
}) {
  const [followed, setFollowed] = useState(false);
  const initial = org.name.charAt(0).toUpperCase();
  const grad = gradients[index % gradients.length];

  return (
    <div
      className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:border-primary/25 transition-smooth group"
      style={{ background: "rgba(15,15,35,0.85)" }}
      data-ocid={`organizers.item.${index + 1}`}
    >
      {/* Avatar */}
      <div className="relative inline-flex mb-4">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-2xl font-black font-display shadow-lg`}
        >
          {initial}
        </div>
        {org.isVerified && (
          <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0a0a1a]">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </span>
        )}
      </div>

      {/* Name + badge */}
      <p className="text-sm font-bold text-foreground leading-tight mb-1">
        {org.name}
      </p>
      {org.isVerified && (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full mb-2">
          <Check className="w-2.5 h-2.5" strokeWidth={3} />
          Verified
        </span>
      )}

      {/* Stats */}
      <div className="flex justify-center gap-4 my-3">
        <div>
          <p className="text-base font-black text-foreground font-display">
            {formatFollowers(org.followers)}
          </p>
          <p className="text-[10px] text-muted-foreground">Followers</p>
        </div>
        <div className="w-px bg-border/20" />
        <div>
          <p className="text-base font-black text-foreground font-display">
            {org.eventsHosted}
          </p>
          <p className="text-[10px] text-muted-foreground">Events</p>
        </div>
      </div>

      {/* Follow button */}
      <button
        type="button"
        onClick={() => setFollowed((f) => !f)}
        className={`w-full py-2 rounded-xl text-xs font-semibold transition-smooth border ${
          followed
            ? "bg-primary/15 border-primary/40 text-primary"
            : "border-border/30 text-muted-foreground hover:border-primary/40 hover:text-foreground hover:bg-primary/10"
        }`}
        data-ocid={`organizers.follow_button.${index + 1}`}
      >
        {followed ? (
          <span className="flex items-center justify-center gap-1">
            <Check className="w-3 h-3" />
            Following
          </span>
        ) : (
          "Follow"
        )}
      </button>
    </div>
  );
}

export function FeaturedOrganizers() {
  return (
    <section
      id="organizers"
      className="py-12 px-4 max-w-7xl mx-auto border-t border-border/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-400" />
        <h2 className="font-display text-2xl font-bold text-foreground">
          Featured Organizers
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockOrganizers.map((org, i) => (
          <OrganizerCard key={org.id} org={org} index={i} />
        ))}
      </div>
    </section>
  );
}
