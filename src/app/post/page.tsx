"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useCreateListing, useUploadVehicleImage } from "@/hooks/useListings";
import { LOCATIONS, VEHICLE_TYPES, type Location, type VehicleType } from "@/types/listing";
import { cn } from "@/lib/utils";

export default function PostPage() {
  const router = useRouter();
  const createListing = useCreateListing();
  const uploadImage = useUploadVehicleImage();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | "">("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !location || !phone.trim() || !description.trim() || !vehicleType) {
      return;
    }

    try {
      const imageUrl = await uploadImage.mutateAsync(imageFile);
      await createListing.mutateAsync({
        image_url: imageUrl,
        location: location as Location,
        phone: phone.trim(),
        description: description.trim(),
        vehicle_type: vehicleType as VehicleType,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const isPending = createListing.isPending || uploadImage.isPending;
  const canSubmit =
    imageFile &&
    location &&
    phone.trim() &&
    description.trim() &&
    vehicleType &&
    !isPending;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex-1 px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-bold tracking-tight mb-6">
          Post a vehicle
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Vehicle image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted border-muted-foreground/25">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 py-6 text-muted-foreground">
                  <Upload className="h-8 w-8" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="vehicle_type" className="block text-sm font-medium mb-2">
              Vehicle type
            </label>
            <select
              id="vehicle_type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as VehicleType)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Select type</option>
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value as Location)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Select location</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your vehicle and service..."
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              required
            />
          </div>

          {createListing.isError && (
            <p className="text-sm text-destructive">
              {createListing.error instanceof Error
                ? createListing.error.message
                : "Something went wrong."}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post listing"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
