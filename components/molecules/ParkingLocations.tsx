import React, { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";
import { useAppContext } from "../../context/AppContext";
import { useParkingContext } from "../../context/ParkingContext";
import { getParkingSpots, getNearbyParkingSpots } from "../api";

import ParkingDetailModal from "./ParkingDetailModal";

const ParkingLocations = () => {
  const { setIsLoading } = useAppContext();

  const [modalPosition, setModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const {
    parkingSpots,
    setParkingSpots,
    targetedParkingSpot,
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

  const handleModalPosition = (coords: any) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setModalPosition({
      x: Math.round((coords.x / windowWidth) * 100),
      y: Math.round((coords.y / windowHeight) * 100),
    });
  };

  const handleNearbyParkingSpots = async (position: any): Promise<void> => {
    setIsLoading(true);
    const data = await getNearbyParkingSpots(position.coords);

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
              setTargetedParkingSpot(
                parkingSpots?.find((item) => item.id === e.currentTarget.id) ||
                  null
              )
            }
          >
            <Marker
              position={position}
              onClick={(e: any) => {
                handleModalPosition({
                  x: e.domEvent.screenX,
                  y: e.domEvent.screenY,
                });
                setTargetedParkingSpot(item);
              }}
            />

            {modalPosition && (
              <ParkingDetailModal
                data={item}
                states={{ targetedParkingSpot, modalPosition }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ParkingLocations;
