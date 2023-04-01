import React, { useEffect } from "react";
import { Marker } from "@react-google-maps/api";
import { useAppContext } from "../../context/AppContext";
import { useParkingContext } from "../../context/ParkingContext";
import { getParkingSpots, getNearbyParkingSpots } from "../api";
import { CoordinateItem } from "../../types";

const ParkingLocations = () => {
  const { setIsLoading } = useAppContext();

  const {
    parkingSpots,
    setParkingSpots,
    setTargetedParkingSpot,
    setCurrentLocation,
  } = useParkingContext();

  const { setIsInitialLoading } = useAppContext();

  const handleParkingSpots = async (): Promise<void> => {
    setIsLoading(true);
    const data = await getParkingSpots();

    data && setParkingSpots(data.features);
    setIsLoading(false);
    setIsInitialLoading(false);
  };

  const handleNearbyParkingSpots = async (
    position: GeolocationPosition
  ): Promise<void> => {
    setIsLoading(true);
    const data = await getNearbyParkingSpots(
      position.coords as unknown as CoordinateItem
    );

    if (data.features.length !== 0) {
      setCurrentLocation({
        lat: position.coords.latitude || 0,
        lng: position.coords.longitude || 0,
        // longitude: 18.07502720995736,
        // lat: 59.31323345086049,
      });
      setParkingSpots(data.features);
      setIsLoading(false);
      setIsInitialLoading(false);
    } else {
      handleParkingSpots();
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handleNearbyParkingSpots,
      handleParkingSpots
    );
  }, []);

  return (
    <ul>
      {parkingSpots?.map((item) => {
        const position: CoordinateItem = {
          lng: item?.geometry?.coordinates[0][0] as unknown as number,
          lat: item?.geometry?.coordinates[0][1] as unknown as number,
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
              position={position as google.maps.LatLngLiteral}
              onClick={() => setTargetedParkingSpot(item)}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ParkingLocations;
