import axios from "axios";

export const getParkingSpots = async (): Promise<Response> => {
  const data = await axios.get("/api/parking");
  return data as unknown as Response;
};
