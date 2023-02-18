import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `${process.env.NEXT_APP_TRAFIKVERKET_API_URL}/all?outputFormat=json&apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}`;
  const { data } = await axios.get(url);
  return res.status(200).json(data);
}
