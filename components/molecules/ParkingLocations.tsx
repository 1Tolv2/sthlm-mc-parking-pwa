import React, { useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import { FeatureItem } from "../../types";
import { getParkingSpots } from "../api";
import ParkingDetailModal from "./ParkingDetailModal";

type Props = {
  states: {
    parkingSpots: FeatureItem[];
    setParkingSpots: (parkingSpots: FeatureItem[]) => void;
    targetedParkingSpot: FeatureItem | null;
    setTargetedParkingSpot: (targetedParkingSpot: FeatureItem | null) => void;
  };
};

const ParkingLocations = ({ states }: Props) => {
  const {
    parkingSpots,
    setParkingSpots,
    targetedParkingSpot,
    setTargetedParkingSpot,
  } = states;

  const handleParkingSpots = async (): Promise<void> => {
    const data = await getParkingSpots();

    data && setParkingSpots(data.features);
  };

  useEffect(() => {
    handleParkingSpots();
  }, []);

  return (
    <ul>
      {parkingSpots?.map((item) => {
        const position: any = {
          lng: item?.geometry?.coordinates[0][0],
          lat: item?.geometry?.coordinates[0][1],
        };
        return (
          <li
            key={item.id}
            id={item.id}
            className="relative"
            onClick={(e) =>
              setTargetedParkingSpot(
                parkingSpots?.find((item) => item.id === e.currentTarget.id) ||
                  null
              )
            }
          >
            <Marker
              position={position}
              onClick={() => setTargetedParkingSpot(item)}
            />

            <ParkingDetailModal data={item} states={{ targetedParkingSpot }} />
          </li>
        );
      })}
    </ul>
  );
};

export default ParkingLocations;
