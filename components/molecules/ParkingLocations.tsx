import React, { useEffect, useState } from "react";
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
  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
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

  const handleModalPosition = (coords: any) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setModalPosition({
      x: Math.round((coords.x / windowWidth) * 100),
      y: Math.round((coords.y / windowHeight) * 100),
    });
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
              onClick={(e: any) => {
                handleModalPosition({
                  x: e.domEvent.screenX,
                  y: e.domEvent.screenY,
                });
                setTargetedParkingSpot(item);
              }}
            />

            {modalPosition && (
              <ParkingDetailModal
                data={item}
                states={{ targetedParkingSpot, modalPosition }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ParkingLocations;
