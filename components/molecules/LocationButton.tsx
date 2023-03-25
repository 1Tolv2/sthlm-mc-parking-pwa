import React, { useState } from "react";
import { CoordinateItem, FeatureItem } from "../../types";
import Icons from "../atoms/Icons";
import StandardContainer from "../atoms/StandardContainer";
import { getNearbyParkingSpots, getParkingSpots } from "../api";

type Props = {
  states: {
    setParkingSpots: React.Dispatch<React.SetStateAction<FeatureItem[]>>;
    setCurrentLocation: React.Dispatch<
      React.SetStateAction<CoordinateItem | null>
    >;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function LocationButton({ states }: Props) {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );
  const { setParkingSpots, setCurrentLocation, isLoading, setIsLoading } =
    states;

  const handleParkingSpots = async (): Promise<void> => {
    setIsLoading(true);
    const data = await getParkingSpots();

    if (data) {
      setParkingSpots(data.features);
    } else {
      console.log("NO DATA FOUND");
    }
    setIsLoading(false);
  };

  const handleNearbyParkingSpots = async (position: any): Promise<void> => {
    setIsLoading(true);
    const data = await getNearbyParkingSpots(position.coords);
    setCurrentLocation({
      // lat: position.coords.latitude || 0,
      // lng: position.coords.longitude || 0,
      lng: 18.07502720995736,
      lat: 59.31323345086049,
    });

    if (data) {
      setParkingSpots(data.features);
    } else {
      console.log("NO DATA FOUND");
    }
    setIsLoading(false);
  };

  const handleLocation = async (): Promise<void> => {
    if (icon === "locationOff") {
      setIcon("locationOn");
      navigator.geolocation.getCurrentPosition(handleNearbyParkingSpots);
    } else {
      setIcon("locationOff");
      handleParkingSpots();
      setCurrentLocation(null);
    }
  };

  return (
    <div className="flex justify-end mx-auto w-full md:w-[500px]">
      <StandardContainer
        padding="none"
        height=""
        width=""
        className="w-[54px] h-[54px]"
      >
        <div
          onClick={isLoading ? undefined : handleLocation}
          className="h-full w-full p-sm cursor-pointer"
        >
          <Icons icon={icon} />
        </div>
      </StandardContainer>
    </div>
  );
}
