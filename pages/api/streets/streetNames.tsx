import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchParam = req.query.search as string;
  const params = new URLSearchParams();
  params.append("streetNamePattern", searchParam + "*");
  params.append("apiKey", process.env.NEXT_APP_TRAFIKVERKET_API_KEY || "");

  const url = `${process.env.NEXT_APP_LV_API_URL}/GetStreetNames`;
  const { data } = await axios.get(url, { params });

  if (data.length === 0) {
    const url = `${process.env.NEXT_APP_LV_API_URL}/GetStreetNamesWithinLevenshteinDistance?apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}&streetName=${searchParam}&maxDistance=3`;
    const { data } = await axios.get(url);
    return res.status(200).json(data);
  } else if (data.length > 0) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "No data found" });
  }
}
