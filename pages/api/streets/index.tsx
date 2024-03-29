import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { streetName, streetNumber } = req.query;
    const url = `${process.env.NEXT_APP_LV_API_URL}/GetAddresses?apiKey=${
      process.env.NEXT_APP_OPEN_PARKING_API_KEY
    }&municipalityPattern=*&streetName=${streetName}&streetNumPattern=${
      streetNumber ?? "*"
    }&postalCodePattern=*&postalAreaPattern=*`;
    const { data } = await axios.get(url);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "No data found" });
    }
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
