import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coordinates } = req.body;

  if (!coordinates.lat && !coordinates.lng)
    return res.status(400).json({ message: "No coordinates provided" });

  if (req.method === "POST") {
    const radius = "&radius=100";
    const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/within?lat=${coordinates.lat}&lng=${coordinates.lng}&outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;

    const response = await axios.get(url + radius);
    const { data } = response;
    if (data.features?.length > 0) {
      return res.status(200).json(data);
    } else {
      const { data } = await axios.get(url + "&radius=200");
      if (data.features?.length > 0) {
        return res.status(200).json(data);
      } else {
        return res.status(200).json({ message: "No parking spots found" });
      }
    }
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
