import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const searchParam = req.query.search;
    const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/street/${searchParam}?outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;
    const { data } = await axios.get(url);
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
