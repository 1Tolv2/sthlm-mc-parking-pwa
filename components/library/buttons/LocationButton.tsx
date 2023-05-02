import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useParkingContext } from "../../../context/ParkingContext";
import { useModalContext } from "../../../context/ModalContext";

import { getNearbyParkingSpots } from "../../api";
import StandardContainer from "../StandardContainer";
import Icons from "../Icons";
import { CoordinateItem } from "../../../types";

export default function LocationButton() {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );
  const { setParkingSpots, currentLocation, setCurrentLocation } =
    useParkingContext();
  const { isLoading, setIsLoading } = useAppContext();
  const { setModalContent } = useModalContext();

  const handleNearbyParkingSpots = async (
    position: GeolocationPosition
  ): Promise<void> => {
    const data = await getNearbyParkingSpots(
      position.coords as unknown as CoordinateItem
    );

    setCurrentLocation({
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
    });
    if (data.features?.length !== 0) {
      setParkingSpots(data.features);
    } else {
      setIsLoading(false);
      setModalContent("Inga parkeringar hittades");
      console.log("NO DATA FOUND");
    }
  };

  const handleLocation = async (): Promise<void> => {
    setIsLoading(true);
    if (icon === "locationOff") {
      setIcon("locationOn");
      navigator.geolocation.getCurrentPosition(handleNearbyParkingSpots);
    } else {
      setIcon("locationOff");
      setCurrentLocation(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentLocation) {
      setIcon("locationOn");
    } else {
      setIcon("locationOff");
    }
  }, [currentLocation]);

  return (
    <div className="flex justify-end mx-auto w-full">
      <StandardContainer
        padding="none"
        height=""
        width=""
        className="w-[54px] h-[54px] drop-shadow-lg md:drop-shadow-2xl"
      >
        <div
          onClick={isLoading ? undefined : handleLocation}
          className="h-full w-full p-sm cursor-pointer pointer-events-auto"
        >
          <Icons icon={icon} />
        </div>
      </StandardContainer>
    </div>
  );
}
