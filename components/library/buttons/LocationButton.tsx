import React, { useState, useEffect } from "react";
import { useMapContext } from "../../../context/MapContext";
import { useAppContext } from "../../../context/AppContext";
import { useParkingContext } from "../../../context/ParkingContext";
import { useModalContext } from "../../../context/ModalContext";

import { getNearbyParkingSpots } from "../../api";
import StandardContainer from "../StandardContainer";
import Icons from "../Icons";
import { CoordinateItem } from "../../../types";
import getHexColor from "../../../utils/getHexColor";

export default function LocationButton() {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );
  type states = {
    loading?: boolean;
    location?: "locationOn" | "locationOff";
  };
  const toggleStates = ({ loading, location }: states): void => {
    if (typeof loading !== "undefined") setIsLoading(loading);
    if (typeof location !== "undefined") setIcon(location);
  };

  const { resetParking, setParkingSpots, currentLocation, setCurrentLocation } =
    useParkingContext();
  const { isLoading, setIsLoading } = useAppContext();
  const { setModalContent } = useModalContext();
  const { resetMap, setMapView } = useMapContext();

  /**
   *
   * @param position
   * Geolocation position `coords: {latitude, longitude}`
   * @description Takes in a position and searches for nearby parking spots then targets your location on the map and displays them.
   * If no features are found it will target your location but trigger an error modal.
   * It then toggles the icon on and turnes of the loader.
   */
  const handleNearbyParkingSpots = async (
    position: GeolocationPosition
  ): Promise<void> => {
    const data = await getNearbyParkingSpots({
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
    } as unknown as CoordinateItem);

    // updates current location and map view
    setCurrentLocation({
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
    });
    setMapView({
      zoom: 16,
      center: {
        lat: position.coords.latitude || 0,
        lng: position.coords.longitude || 0,
      },
    });

    // if features it will display them or else it shows a error modal
    if (data.features && data.features.length !== 0) {
      setParkingSpots(data.features);
    } else {
      setModalContent("Inga parkeringar hittades");
    }
    toggleStates({ location: "locationOn", loading: false });
  };

  const handleDeniedLocation = (): void => {
    toggleStates({ location: "locationOff", loading: false });
    setModalContent(
      "Du måste tillåta platsdelning för att kunna använda den här funktionen"
    );
  };

  /**
   * @description If location is turned off it will try to get your location if your location is turned on it will clear your location.
   */
  const handleLocation = async (): Promise<void> => {
    setIsLoading(true);
    toggleStates({ loading: true });
    if (icon === "locationOff") {
      navigator.geolocation.getCurrentPosition(
        handleNearbyParkingSpots,
        handleDeniedLocation
      );
      localStorage.setItem("hasAskedForLocationPermission", "true");
    } else {
      setCurrentLocation(null);
      resetMap();
      resetParking();
      toggleStates({ location: "locationOff", loading: false });
    }
  };

  /**
   * @description Sets the icon to locationOn if currentLocation is not null
   */
  useEffect(() => {
    if (currentLocation) {
      toggleStates({ location: "locationOn" });
    } else {
      toggleStates({ location: "locationOff" });
    }
  }, [currentLocation]);

  return (
    <StandardContainer shadow width="w-fit" padding="md sm:p-lg" round>
      <div
        onClick={isLoading ? undefined : handleLocation}
        className="relative top-px -left-px w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] cursor-pointer pointer-events-auto"
      >
        <Icons
          icon={icon}
          color={
            (icon === "locationOn"
              ? getHexColor("primary")
              : getHexColor("black")) || "#000"
          }
        />
      </div>
    </StandardContainer>
  );
}
