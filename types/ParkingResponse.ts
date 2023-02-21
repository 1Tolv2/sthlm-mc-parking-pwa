import { FeatureItem } from "./FeatureItem";

export interface ParkingResponse {
  type: "FeatureCollection";
  features: FeatureItem[];
  totalFeatures: number;
  numberMatched: number;
  numberReturned: number;
  timeStamp: Date;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
}
