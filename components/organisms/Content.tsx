import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useMapContext } from "../../context/MapContext";
import { FeatureItem, CoordinateItem } from "../../types";
import Map from "../molecules/Map";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";
import LoadingScreen from "../molecules/loadingComponents/LoadingScreen";
import LoadingModal from "../molecules/loadingComponents/LoadingModal";

type Props = {};

const Content = (props: Props) => {
  const { isInitialLoading, isLoading, setIsInitialLoading, setIsLoading } =
    useAppContext();

  const { zoom, setZoom, center, setCenter } = useMapContext();
  // const [zoom, setZoom] = useState(11);
  // const [center, setCenter] = useState<CoordinateItem | null>({
  //   lat: 59.31323345086049,
  //   lng: 18.07502720995736,
  // });

  const [parkingSpots, setParkingSpots] = useState<FeatureItem[]>([]);
  const [targetedParkingSpot, setTargetedParkingSpot] =
    useState<FeatureItem | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinateItem | null>(
    null
  );

  return (
    <>
      {isLoading && isInitialLoading && <LoadingScreen />}
      {isLoading && !isInitialLoading && <LoadingModal />}
      <Map />
      <TopNavigation />
      <BottomNavigation />
    </>
  );
};

export default Content;
