import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchListings,
  createListing as createListingService,
  uploadVehicleImage,
} from "@/services/listingService";
import type { CreateListingInput } from "@/types/listing";

const LISTINGS_QUERY_KEY = ["listings"];

export function useListings() {
  return useQuery({
    queryKey: LISTINGS_QUERY_KEY,
    queryFn: fetchListings,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateListingInput) => {
      return createListingService(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_QUERY_KEY });
    },
  });
}

export function useUploadVehicleImage() {
  return useMutation({
    mutationFn: (file: File) => uploadVehicleImage(file),
  });
}
