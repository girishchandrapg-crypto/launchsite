import type { EventCategory } from "@/types/events";

interface CategoryDef {
  id: EventCategory | "all";
  name: string;
  emoji: string;
}

const categories: CategoryDef[] = [
  { id: "all", name: "All Events", emoji: "🌟" },
  { id: "music", name: "Music", emoji: "🎵" },
  { id: "technology", name: "Technology", emoji: "💻" },
  { id: "food", name: "Food & Drink", emoji: "🍽️" },
  { id: "art", name: "Art", emoji: "🎨" },
  { id: "sports", name: "Sports", emoji: "⚽" },
  { id: "comedy", name: "Comedy", emoji: "😂" },
  { id: "wellness", name: "Wellness", emoji: "🧘" },
  { id: "gaming", name: "Gaming", emoji: "🎮" },
  { id: "business", name: "Business", emoji: "💼" },
];

interface CategoryChipsProps {
  selected: EventCategory | "all";
  onSelect: (id: EventCategory | "all") => void;
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <section className="py-5 overflow-x-auto" aria-label="Event categories">
      <div
        className="flex gap-2 px-4 max-w-7xl mx-auto w-max md:w-auto md:flex-wrap"
        data-ocid="categories.list"
      >
        {categories.map((cat) => (
          <button
            type="button"
            key={cat.id}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-smooth ${
              selected === cat.id
                ? "gradient-hero text-white border-transparent"
                : "border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
            }`}
            onClick={() => onSelect(cat.id)}
            data-ocid={`categories.${cat.id}_tab`}
            style={
              selected !== cat.id
                ? { background: "rgba(255,255,255,0.03)" }
                : undefined
            }
          >
            <span aria-hidden="true">{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export { categories };
