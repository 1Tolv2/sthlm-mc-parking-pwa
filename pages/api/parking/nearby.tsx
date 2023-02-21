import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { coordinates } = req.body;
  const testCoordinates = {
    lng: 18.07502720995736,
    lat: 59.31323345086049,
  };
  const radius = "&radius=100";
  const url = `${process.env.NEXT_APP_TRAFIKVERKET_API_URL}/within?lat=${testCoordinates.lat}&lng=${testCoordinates.lng}&outputFormat=json&apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}`;
  const { data } = await axios.get(url + radius);
  if (data.features.length > 0) {
    return res.status(200).json(data);
  } else {
    const { data } = await axios.get(url + "&radius=300");
    if (data.features.length > 0) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No parking spots found" });
    }
  }
}
