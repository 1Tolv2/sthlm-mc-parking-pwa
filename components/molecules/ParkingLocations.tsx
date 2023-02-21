import React, { useContext, useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import { ParkingContext } from "../Layout/Layout";
import { getParkingSpots } from "../api";

import ParkingDetailModal from "./ParkingDetailModal";

const ParkingLocations = () => {
  const {
    parkingSpots,
    setParkingSpots,
    currentParkingSpot,
    setCurrentParkingSpot,
  } = useContext(ParkingContext);

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
              setCurrentParkingSpot(
                parkingSpots?.find((item) => item.id === e.currentTarget.id) ||
                  null
              )
            }
          >
            <Marker position={position} />
            {currentParkingSpot && currentParkingSpot.id === item.id && (
              <ParkingDetailModal data={item} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ParkingLocations;
