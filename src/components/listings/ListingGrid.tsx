"use client";

import { useListings } from "@/hooks/useListings";
import { useFilterStore } from "@/store/useFilterStore";
import { ListingCard } from "./ListingCard";
import { LOCATIONS } from "@/types/listing";
import { cn } from "@/lib/utils";

export function ListingGrid() {
  const { data: listings = [], isLoading, error } = useListings();
  const selectedLocation = useFilterStore((s) => s.selectedLocation);
  const setSelectedLocation = useFilterStore((s) => s.setSelectedLocation);

  const filteredListings = selectedLocation
    ? listings.filter((l) => l.location === selectedLocation)
    : listings;

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load listings. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border bg-muted/50 aspect-[4/3] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Location:
        </span>
        <button
          onClick={() => setSelectedLocation(null)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            !selectedLocation
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          All
        </button>
        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            onClick={() => setSelectedLocation(loc)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              selectedLocation === loc
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {loc}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredListings.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No listings found.
          </p>
        ) : (
          filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}
