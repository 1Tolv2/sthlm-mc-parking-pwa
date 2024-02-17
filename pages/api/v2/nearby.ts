import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { pruneFeatures } from "../../../utils/pruneFeatures";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { lat, lng } = req.query;

    if (!lat || !lng)
      return res
        .status(400)
        .json({ message: "lat and lng coordinates must be provided" });

    const radius = "&radius=100";
    const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/within?lat=${lat}&lng=${lng}&outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;

    const fetchData = async (url: string) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (err) {
        return res.status(500).json({ message: "Couldn't reach Parking API" });
      }
    };

    let data = await fetchData(url + radius);

    if (!data.features)
      return res.status(404).json({ message: "No data found" });

    if (data.features?.length === 0) {
      data = await fetchData(url + "&radius=200");
    }
    data.features = pruneFeatures(data.features);
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
