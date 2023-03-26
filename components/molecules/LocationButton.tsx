import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useParkingContext } from "../../context/ParkingContext";
import { useModalContext } from "../../context/ModalContext";

import { getNearbyParkingSpots, getParkingSpots } from "../api";
import StandardContainer from "../atoms/StandardContainer";
import Icons from "../atoms/Icons";

type Props = {};

export default function LocationButton(props: Props) {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );
  const { setParkingSpots, setCurrentLocation } = useParkingContext();
  const { isLoading, setIsLoading } = useAppContext();
  const { setModalContent } = useModalContext();

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
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
      // longitude: 18.07502720995736,
      // lat: 59.31323345086049,
    });
    if (data.features.length !== 0) {
      setParkingSpots(data.features);
    } else {
      setParkingSpots([]);
      setIsLoading(false);
      setModalContent("Inga parkeringar hittades");
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
