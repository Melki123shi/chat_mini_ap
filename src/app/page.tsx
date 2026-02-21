import Link from "next/link";
import { Truck, Plus } from "lucide-react";
import { ListingGrid } from "@/components/listings/ListingGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Truck className="h-6 w-6" />
            MoveEase
          </Link>
          <Link
            href="/post"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Post a vehicle
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8">
        <section className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            House-moving transport
          </h1>
          <p className="text-muted-foreground mt-1">
            Find or offer trucks, vans, and cars for moving.
          </p>
        </section>
        <ListingGrid />
      </main>
    </div>
  );
}
