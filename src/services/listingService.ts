import { supabase } from "@/lib/supabase";
import type { Listing, CreateListingInput } from "@/types/listing";

const TABLE = "listings";
const BUCKET = "vehicles";

export async function fetchListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Listing[];
}

export async function createListing(
  input: CreateListingInput
): Promise<Listing> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("You must be signed in to post.");

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      user_id: user.id,
      image_url: input.image_url,
      location: input.location,
      phone: input.phone,
      description: input.description,
      vehicle_type: input.vehicle_type,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Listing;
}

export async function uploadVehicleImage(file: File): Promise<string> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("You must be signed in to upload.");

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${user.id}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}
