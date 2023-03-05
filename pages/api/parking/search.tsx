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
  const searchParam = firstLettersToUpperCase(req.body.search as string);
  const url = `${process.env.NEXT_APP_TRAFIKVERKET_API_URL}/street/${searchParam}?outputFormat=json&apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}`;
  const { data } = await axios.get(url);
  return res.status(200).json(data);
}
