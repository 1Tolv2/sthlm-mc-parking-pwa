import axios from "axios";
import { CoordinateItem, ParkingResponse } from "../types";

export const getParkingSpots = async (): Promise<ParkingResponse> => {
  const { data } = await axios.get("/api/parking");
  return data as unknown as ParkingResponse;
};

export const getNearbyParkingSpots = async (
  coordinates: CoordinateItem
): Promise<ParkingResponse> => {
  const { data } = await axios.post("/api/parking/nearby", {
    coordinates: {
      longitude: coordinates.lng,
      latitude: coordinates.lat,
    },
  });
  return data as unknown as ParkingResponse;
};

export const searchParkingSpots = async (
  search: string
): Promise<ParkingResponse> => {
  const { data } = await axios.post("/api/parking/search", { search });
  return data as unknown as ParkingResponse;
};
