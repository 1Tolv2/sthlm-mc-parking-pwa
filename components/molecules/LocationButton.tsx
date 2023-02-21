import React, { useState, useContext } from "react";
import { ParkingContext } from "../Layout/Layout";
import Icons from "../atoms/Icons";
import StandardContainer from "../atoms/StandardContainer";
import { getNearbyParkingSpots, getParkingSpots } from "../api";

export default function LocationButton() {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );
  const { setParkingSpots } = useContext(ParkingContext);

  const handleParkingSpots = async (): Promise<void> => {
    const data = await getParkingSpots();

    if (data) {
      setParkingSpots(data.features);
    } else {
      console.log("NO DATA FOUND");
    }
  };

  const handleNearbyParkingSpots = async (position: any): Promise<void> => {
    const data = await getNearbyParkingSpots(position.coords);

    if (data) {
      setParkingSpots(data.features);
    } else {
      console.log("NO DATA FOUND");
    }
  };

  const handleLocation = async (): Promise<void> => {
    if (icon === "locationOff") {
      setIcon("locationOn");
      navigator.geolocation.getCurrentPosition(handleNearbyParkingSpots);
    } else {
      setIcon("locationOff");
      handleParkingSpots();
    }
  };

  return (
    <div className="flex justify-end w-full mx-auto max-w-[500px]">
      <StandardContainer
        padding="none"
        height=""
        width=""
        className="w-[54px] h-[54px]"
      >
        <div
          onClick={handleLocation}
          className="h-full w-full p-sm cursor-pointer"
        >
          <Icons icon={icon} />
        </div>
      </StandardContainer>
    </div>
  );
}
