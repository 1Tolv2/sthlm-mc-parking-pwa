import React, { useEffect } from "react";
import { Marker, MarkerClusterer } from "@react-google-maps/api";

import { useAppContext } from "../../../context/AppContext";
import { useParkingContext } from "../../../context/ParkingContext";
import { useModalContext } from "../../../context/ModalContext";

import { getNearbyParkingSpots } from "../../api";
import { CoordinateItem } from "../../../types";

const ParkingLocations = () => {
  const {
    parkingSpots,
    setParkingSpots,
    setTargetedParkingSpot,
    setCurrentLocation,
  } = useParkingContext();

  const { setIsInitialLoading, setIsLoading } = useAppContext();
  const { setModalContent } = useModalContext();

  const handleNearbyParkingSpots = async (
    position: GeolocationPosition
  ): Promise<void> => {
    setIsLoading(true);
    const data = await getNearbyParkingSpots(
      position.coords as unknown as CoordinateItem
    );
    setCurrentLocation({
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
    });
    if (!data.features || data.features?.length !== 0)
      setModalContent("Inga parkeringar i närheten");
    if (data.features?.length > 0) setParkingSpots(data.features);
    setIsLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleNearbyParkingSpots, () => {
      setIsLoading(false);
      setIsInitialLoading(false);
    });
  }, []);

  return (
    <MarkerClusterer maxZoom={15} minimumClusterSize={3}>
      {(clusterer) => (
        <div>
          {parkingSpots?.map((item) => (
            <Marker
              key={item.id}
              position={{
                lng: item?.geometry?.coordinates[0][0] as unknown as number,
                lat: item?.geometry?.coordinates[0][1] as unknown as number,
              }}
              clusterer={clusterer}
              onClick={() => setTargetedParkingSpot(item)}
            />
          ))}
        </div>
      )}
    </MarkerClusterer>
  );
};

export default ParkingLocations;
