export const LOCATIONS = [
  "Downtown",
  "Uptown",
  "Suburbs",
  "Midtown",
  "Industrial",
  "Rural",
  "Airport",
  "Harbor",
] as const;

export const VEHICLE_TYPES = ["Truck", "Van", "Car"] as const;

export type Location = (typeof LOCATIONS)[number];
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export interface Listing {
  id: string;
  user_id: string;
  image_url: string;
  location: Location;
  phone: string;
  description: string;
  vehicle_type: VehicleType;
  created_at?: string;
}

export interface CreateListingInput {
  image_url: string;
  location: Location;
  phone: string;
  description: string;
  vehicle_type: VehicleType;
}
