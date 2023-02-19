import React, { useContext, useEffect } from "react";
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
    if (data) {
      console.log("DATA", data.features);
      setParkingSpots([
        data.features[0],
        data.features[1],
        data.features[2],
        data.features[3],
      ]);
    }
  };

  useEffect(() => {
    handleParkingSpots();
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 z-50  w-fit h-fit">
      <ul className="grid grid-cols-2 gap-md">
        {parkingSpots?.map((item) => (
          <li
            key={item.id}
            id={item.id}
            onClick={(e) =>
              setCurrentParkingSpot(
                parkingSpots?.find((item) => item.id === e.currentTarget.id) ||
                  null
              )
            }
            className="relative"
          >
            {currentParkingSpot && currentParkingSpot.id === item.id && (
              <ParkingDetailModal data={item} />
            )}
            <span className="block w-[20px] h-[20px] bg-primary-500 rounded-full cursor-pointer drop-shadow" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingLocations;
