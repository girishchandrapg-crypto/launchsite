import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export interface FiltersState {
  dateRange: "today" | "this-week" | "this-month" | "custom" | "any";
  priceMax: number;
  distance: "5km" | "10km" | "25km" | "50km" | "any";
  formats: Set<"in-person" | "online" | "hybrid">;
  subCategories: Set<string>;
}

export const defaultFilters: FiltersState = {
  dateRange: "any",
  priceMax: 500,
  distance: "any",
  formats: new Set(),
  subCategories: new Set(),
};

const dateRangeOptions: { id: FiltersState["dateRange"]; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "this-week", label: "This Week" },
  { id: "this-month", label: "This Month" },
  { id: "custom", label: "Custom Range" },
  { id: "any", label: "Any time" },
];

const distanceOptions: { id: FiltersState["distance"]; label: string }[] = [
  { id: "5km", label: "Within 5 km" },
  { id: "10km", label: "Within 10 km" },
  { id: "25km", label: "Within 25 km" },
  { id: "50km", label: "Within 50 km" },
  { id: "any", label: "Any Distance" },
];

const formatOptions: {
  id: "in-person" | "online" | "hybrid";
  label: string;
}[] = [
  { id: "in-person", label: "In-Person" },
  { id: "online", label: "Online" },
  { id: "hybrid", label: "Hybrid" },
];

const subCategoryOptions = [
  "Festival",
  "Concert",
  "Workshop",
  "Conference",
  "Hackathon",
  "Networking",
  "Wine Tasting",
  "Marathon",
  "Exhibition",
];

interface FiltersSidebarProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

function SectionHeader({
  label,
  expanded,
  onToggle,
}: { label: string; expanded: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground"
      onClick={onToggle}
    >
      {label}
      {expanded ? (
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  name,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div className="space-y-2 mt-1">
      {options.map((opt) => (
        <label
          key={opt.id}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="radio"
            name={name}
            value={opt.id}
            checked={value === opt.id}
            onChange={() => onChange(opt.id)}
            className="w-3.5 h-3.5 accent-primary"
          />
          <span
            className={`text-xs transition-smooth ${value === opt.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export function FiltersSidebar({
  filters,
  onChange,
  mobileOpen,
  onMobileClose,
}: FiltersSidebarProps) {
  const [openSections, setOpenSections] = useState({
    date: true,
    price: true,
    distance: false,
    format: true,
    subcat: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleFormat = (fmt: "in-person" | "online" | "hybrid") => {
    const next = new Set(filters.formats);
    if (next.has(fmt)) next.delete(fmt);
    else next.add(fmt);
    onChange({ ...filters, formats: next });
  };

  const toggleSubCat = (cat: string) => {
    const next = new Set(filters.subCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    onChange({ ...filters, subCategories: next });
  };

  const clearFilters = () => onChange(defaultFilters);

  const sidebarContent = (
    <div
      className="rounded-2xl border border-white/5 p-5 space-y-1"
      style={{ background: "rgba(15,15,35,0.8)", backdropFilter: "blur(16px)" }}
      data-ocid="filters.panel"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-display font-bold text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          Filters
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground h-7 px-2"
          onClick={clearFilters}
          data-ocid="filters.clear_button"
        >
          Clear all
        </Button>
      </div>

      <div className="border-t border-border/20 pt-2">
        <SectionHeader
          label="Date Range"
          expanded={openSections.date}
          onToggle={() => toggleSection("date")}
        />
        {openSections.date && (
          <RadioGroup
            options={dateRangeOptions}
            value={filters.dateRange}
            onChange={(v) => onChange({ ...filters, dateRange: v })}
            name="date-range"
          />
        )}
      </div>

      <div className="border-t border-border/20 pt-2">
        <SectionHeader
          label={`Price Range (up to ₹${filters.priceMax === 500 ? "500+" : filters.priceMax})`}
          expanded={openSections.price}
          onToggle={() => toggleSection("price")}
        />
        {openSections.price && (
          <div className="mt-2 px-1">
            <input
              type="range"
              min={0}
              max={500}
              step={50}
              value={filters.priceMax}
              onChange={(e) =>
                onChange({ ...filters, priceMax: Number(e.target.value) })
              }
              className="w-full accent-primary cursor-pointer"
              data-ocid="filters.price_range"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Free</span>
              <span>₹500+</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border/20 pt-2">
        <SectionHeader
          label="Distance"
          expanded={openSections.distance}
          onToggle={() => toggleSection("distance")}
        />
        {openSections.distance && (
          <RadioGroup
            options={distanceOptions}
            value={filters.distance}
            onChange={(v) => onChange({ ...filters, distance: v })}
            name="distance"
          />
        )}
      </div>

      <div className="border-t border-border/20 pt-2">
        <SectionHeader
          label="Format"
          expanded={openSections.format}
          onToggle={() => toggleSection("format")}
        />
        {openSections.format && (
          <div className="space-y-2 mt-1">
            {formatOptions.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.formats.has(opt.id)}
                  onChange={() => toggleFormat(opt.id)}
                  className="w-3.5 h-3.5 accent-primary rounded"
                  data-ocid={`filters.format.${opt.id}`}
                />
                <span
                  className={`text-xs transition-smooth ${filters.formats.has(opt.id) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border/20 pt-2">
        <SectionHeader
          label="Sub-categories"
          expanded={openSections.subcat}
          onToggle={() => toggleSection("subcat")}
        />
        {openSections.subcat && (
          <div className="space-y-2 mt-1">
            {subCategoryOptions.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.subCategories.has(cat)}
                  onChange={() => toggleSubCat(cat)}
                  className="w-3.5 h-3.5 accent-primary rounded"
                />
                <span
                  className={`text-xs transition-smooth ${filters.subCategories.has(cat) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                >
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always visible sidebar */}
      <aside className="hidden lg:block w-60 shrink-0">{sidebarContent}</aside>

      {/* Mobile: bottom sheet overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40" data-ocid="filters.sheet">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            aria-label="Close filters"
            onClick={onMobileClose}
            onKeyDown={(e) => e.key === "Escape" && onMobileClose()}
          />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-border/20 p-5 max-h-[85vh] overflow-y-auto"
            style={{ background: "#0a0a1a" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-bold text-foreground">Filters</p>
              <button
                type="button"
                onClick={onMobileClose}
                className="text-muted-foreground hover:text-foreground transition-smooth"
                aria-label="Close filters"
                data-ocid="filters.close_button"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
