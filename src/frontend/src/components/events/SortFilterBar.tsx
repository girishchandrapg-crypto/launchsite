import type { SortOption, ViewMode } from "@/types/events";
import { ChevronDown, Grid3x3, List, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sortLabels: Record<SortOption, string> = {
  "date-newest": "Date: Newest",
  "date-oldest": "Date: Oldest",
  "price-low": "Price: Low → High",
  "price-high": "Price: High → Low",
  popularity: "Most Popular",
};

interface SortFilterBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultCount: number;
  selectedCategoryLabel: string;
}

export function SortFilterBar({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  resultCount,
  selectedCategoryLabel,
}: SortFilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sortOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortOpen]);

  return (
    <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
      <h2 className="font-display text-2xl font-bold text-foreground">
        {selectedCategoryLabel}
        <span className="ml-2 text-base font-normal text-muted-foreground">
          ({resultCount})
        </span>
      </h2>

      <div className="flex items-center gap-2">
        {/* Sort dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border/30 text-xs text-muted-foreground hover:text-foreground hover:border-border/60 transition-smooth"
            style={{ background: "rgba(255,255,255,0.03)" }}
            onClick={() => setSortOpen(!sortOpen)}
            data-ocid="events.sort_select"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {sortLabels[sortBy]}
            <ChevronDown className="w-3 h-3" />
          </button>

          {sortOpen && (
            <div
              className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border/30 z-20 overflow-hidden"
              style={{
                background: "rgba(10,10,26,0.98)",
                backdropFilter: "blur(16px)",
              }}
              data-ocid="events.sort_dropdown"
            >
              {(Object.entries(sortLabels) as [SortOption, string][]).map(
                ([key, label]) => (
                  <button
                    type="button"
                    key={key}
                    className={`w-full text-left px-3 py-2.5 text-xs transition-smooth ${
                      sortBy === key
                        ? "text-foreground bg-muted/10"
                        : "text-muted-foreground hover:bg-muted/10 hover:text-foreground"
                    }`}
                    onClick={() => {
                      onSortChange(key);
                      setSortOpen(false);
                    }}
                    data-ocid={`events.sort.${key}`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* View toggle */}
        <div
          className="flex rounded-lg border border-border/30 overflow-hidden"
          aria-label="View mode"
        >
          <button
            type="button"
            className={`p-2 transition-smooth ${
              viewMode === "grid"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onViewModeChange("grid")}
            data-ocid="events.grid_view_toggle"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            className={`p-2 transition-smooth ${
              viewMode === "list"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onViewModeChange("list")}
            data-ocid="events.list_view_toggle"
            aria-label="List view"
            aria-pressed={viewMode === "list"}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
