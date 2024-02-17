import axios from "axios";
import { CoordinateItem, ParkingResponse } from "../types";

export const getParkingSpots = async (): Promise<ParkingResponse> => {
  const { data } = await axios.get("/api/v1/parking");
  return data as unknown as ParkingResponse;
};

export const getNearbyParkingSpots = async (
  coordinates: CoordinateItem
): Promise<ParkingResponse> => {
  const { data } = await axios.get(
    `/api/v2/nearby?lat=${coordinates.lat}&lng=${coordinates.lng}`
  );
  return data as unknown as ParkingResponse;
};

export const searchParkingSpots = async (
  search: string
): Promise<ParkingResponse> => {
  const { data } = await axios.get(`/api/v1/parking/street?search=${search}`);
  return data as unknown as ParkingResponse;
};

export const getStreets = async (
  streetName: string,
  streetNumber?: string
): Promise<CoordinateItem> => {
  const { data } = await axios.get(
    `/api/v1/streets?streetName=${streetName}${
      streetNumber ? "&streetNumber=${streetNumber}" : ""
    }`
  );
  return data as unknown as CoordinateItem;
};

export const searchStreetName = async (search: string): Promise<string[]> => {
  const { data } = await axios.get(
    `/api/v1/streets/streetNames?search=${search}`
  );
  return data[0]?.StreetNames as unknown as string[];
};

/**
 * @deprecated Is no longer supported by Stockholms LvWS API
 */
export const getStreetLocation = async (
  streetName: string,
  streetNumber?: string
): Promise<CoordinateItem> => {
  const { data } = await axios.get(
    `/api/v1/streets/streetLocation?streetName=${streetName}${
      streetNumber ? "&streetNumber=${streetNumber}" : ""
    }`
  );
  return data as unknown as CoordinateItem;
};
