import { CoordinateItem } from "./coordinateItem";
import { Weekday } from ".";

export interface FeatureItem {
  type: "Feature";
  id: string;
  geometry: {
    type: string;
    coordinates: CoordinateItem[];
  };
  geometry_name: "GEOMETRY";
  properties: {
    FID: number;
    FEATURE_OBJECT_ID: number;
    FEATURE_VERSION_ID: number;
    EXTENT_NO: 1;
    VALID_FROM: string;
    START_TIME: number;
    END_TIME: number;
    START_WEEKDAY: Weekday;
    CITATION: string;
    STREET_NAME: string;
    CITY_DISTRICT: string;
    PARKING_DISTRICT: string;
    ADDRESS: string;
    VF_METER: number;
    VF_PLATS_TYP: "Reserverad p-plats motorcykel";
    OTHER_INFO: string;
    RDT_URL: string;
    PARKING_RATE: string;
  };
}
