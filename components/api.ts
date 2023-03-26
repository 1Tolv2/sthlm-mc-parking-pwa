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

export const searchParkingSpots = async (
  search: string
): Promise<ParkingResponse> => {
  const { data } = await axios.get(`/api/parking/search?search=${search}`);
  return data as unknown as ParkingResponse;
};

export const searchStreetName = async (search: string): Promise<string[]> => {
  const { data } = await axios.get(`/api/streets/streetNames?search=${search}`);
  return data[0]?.StreetNames as unknown as string[];
};

export const getStreetLocation = async (
  search: string
): Promise<CoordinateItem> => {
  const { data } = await axios.get(
    `/api/streets/streetLocation?search=${search}`
  );
  return data as unknown as CoordinateItem;
};
