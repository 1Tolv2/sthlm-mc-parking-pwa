import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const firstLettersToUpperCase = (string: string) => {
  const splitString = string.split(" ");
  const formattedText = splitString.map((item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  });

  return formattedText.join(" ");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchParam = req.query.search as string;
  const url = `${process.env.NEXT_APP_LV_API_URL}/GetStreetNames?apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}&streetNamePattern=${searchParam}*`;
  const { data } = await axios.get(url);

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
