import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchParam = req.query.search as string;
  const url = `${process.env.NEXT_APP_LV_API_URL}/GetAddresses?apiKey=${process.env.NEXT_APP_TRAFIKVERKET_API_KEY}&municipalityPattern=*&streetName=${searchParam}&streetNumPattern=*&postalCodePattern=*&postalAreaPattern=*`;
  const response = await axios.get(url);
  if (response.data) {
    const { data } = response;
    const middleAddress = data[Math.round(data.length / 2)];
    const addressCoordinates = middleAddress.Wkt.replace(/[^\d.-]+/g, " ")
      .split(" ")
      .filter((str: string) => str !== "");
    return res.status(200).json({
      lng: parseFloat(addressCoordinates[0]),
      lat: parseFloat(addressCoordinates[1]),
    });
  } else {
    return res.status(404).json({ message: "No data found" });
  }
}
