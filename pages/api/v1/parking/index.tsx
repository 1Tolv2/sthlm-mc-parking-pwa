import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { pruneFeatures } from "../../../../utils/pruneFeatures";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/all?outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;
    let data;

    try {
      const response = await axios.get(url);
      data = response.data;
    } catch (err) {
      return res.status(500).json({ message: "Couldn't reach Parking API" });
    }

    if (!data.features) {
      return res.status(404).json({ message: "No data found" });
    } else {
      data.features = pruneFeatures(data.features);
      return res.status(200).json(data);
    }
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
