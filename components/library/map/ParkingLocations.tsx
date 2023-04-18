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

    // if (data.features.length !== 0) {
    setCurrentLocation({
      lat: position.coords.latitude || 0,
      lng: position.coords.longitude || 0,
      // lng: 18.07502720995736,
      // lat: 59.31323345086049,
    });
    if (data.features.length === 0)
      setModalContent("Inga parkeringar i närheten");
    if (data.features.length > 0) setParkingSpots(data.features);
    // }
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
      {(clusterer) =>
        parkingSpots &&
        (parkingSpots as any)?.map((item: any) => (
          <Marker
            key={item.id}
            position={{
              lng: item?.geometry?.coordinates[0][0] as unknown as number,
              lat: item?.geometry?.coordinates[0][1] as unknown as number,
            }}
            clusterer={clusterer}
            onClick={() => setTargetedParkingSpot(item)}
          />
        ))
      }
    </MarkerClusterer>
  );
};

export default ParkingLocations;
