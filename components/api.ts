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
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
    },
  });
  return data as unknown as ParkingResponse;
};
