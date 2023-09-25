import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FeatureItem } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const url = `${process.env.NEXT_APP_OPEN_PARKING_API_URL}/all?outputFormat=json&apiKey=${process.env.NEXT_APP_OPEN_PARKING_API_KEY}`;
    const response = await axios.get(url);
    const { data } = response;

    const modifiedData: FeatureItem[] = [];
    data.features.forEach((feature: FeatureItem) => {
      if (
        !modifiedData.find(
          (item) => item.properties.ADDRESS === feature.properties.ADDRESS
        )
      ) {
        modifiedData.push(feature);
      } else if (feature.properties.ADDRESS === "<Adress saknas>") {
        modifiedData.push(feature);
      }
    });
    data.features = modifiedData;

    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "Method not available" });
  }
}
