"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

export function ListingCard({ listing, className }: ListingCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={listing.image_url}
          alt={listing.description.slice(0, 80) || "Vehicle"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {listing.vehicle_type}
          </span>
          <span className="text-sm font-semibold">{listing.location}</span>
        </div>
        <p className="text-sm line-clamp-2 flex-1">{listing.description}</p>
        <a
          href={`tel:${listing.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
      </div>
    </article>
  );
}
