import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { getNearbyParkingSpots } from "./api";
import { useAppContext } from "../context/AppContext";
import { useParkingContext } from "../context/ParkingContext";
import { useModalContext } from "../context/ModalContext";

import { FeatureItem, CoordinateItem } from "../types";

import MapNavigation from "./MapNavigation";
import ErrorScreen from "./library/ErrorScreen";
import LoadingScreen from "./library/loading/LoadingScreen";
import { useMapContext } from "../context/MapContext";

type Props = {
  data: FeatureItem[];
};

const DynamicMap = dynamic(() => import("./library/map/Map"), { ssr: false });

const Content = ({ data }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const router = useRouter();

  const { isInitialLoading, isLoading, setIsLoading, setIsInitialLoading } =
    useAppContext();
  const { setMapView } = useMapContext();
  const { setParkingSpots, setCurrentLocation, setTargetedParkingSpot } =
    useParkingContext();
  const { setModalContent } = useModalContext();

  const handleNearbyParkingSpots = async (
    position: GeolocationPosition
  ): Promise<void> => {
    setIsLoading(true);
    const locationBasedData = await getNearbyParkingSpots({
      lng: position.coords.longitude,
      lat: position.coords.latitude,
    } as CoordinateItem);

    if (!locationBasedData.features || locationBasedData.features?.length === 0)
      setModalContent("Inga parkeringar i närheten");

    setMapView({
      zoom: 16,
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
    setCurrentLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    if (locationBasedData.features?.length > 0) {
      setParkingSpots(locationBasedData.features);
    } else {
      setParkingSpots(data);
    }

    setIsLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    if (router.isReady && data) {
      if (router.query?.id) {
        const id = router.query.id as string;
        const target = data.find((item) => item.id === id);
        setParkingSpots(data);

        if (target) {
          setMapView({
            zoom: 16,
            center: {
              lat: target.geometry.coordinates[0][1] as unknown as number,
              lng: target.geometry.coordinates[0][0] as unknown as number,
            },
          });
          setCurrentLocation({
            lat: target.geometry.coordinates[0][1] as unknown as number,
            lng: target.geometry.coordinates[0][0] as unknown as number,
          });
          setTargetedParkingSpot(target);
        }
        setIsLoading(false);
        setIsInitialLoading(false);
      } else {
        const hasAsked = localStorage.getItem("hasAskedForLocationPermission");

        if (hasAsked === "true") {
          navigator.geolocation.getCurrentPosition(
            handleNearbyParkingSpots,
            () => {
              if (data.length > 0) setParkingSpots(data);
              setIsLoading(false);
              setIsInitialLoading(false);
            }
          );
        } else {
          if (data.length > 0) setParkingSpots(data);
          setIsLoading(false);
          setIsInitialLoading(false);
        }
      }
    }
  }, [router]);

  return (
    <>
      {(!data || data.length === 0) && <ErrorScreen />}
      {isLoading && isInitialLoading && <LoadingScreen withSilhouette={true} />}
      <DynamicMap>
        <MapNavigation
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </DynamicMap>
    </>
  );
};

export default Content;
