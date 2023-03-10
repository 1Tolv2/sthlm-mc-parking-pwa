import React, { useState } from "react";
import { FeatureItem, CoordinateItem } from "../../types";
import Map from "../molecules/Map";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";

type Props = {};

const Content = (props: Props) => {
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState<CoordinateItem | null>({
    lat: 59.31323345086049,
    lng: 18.07502720995736,
  });

  const [parkingSpots, setParkingSpots] = useState<FeatureItem[]>([]);
  const [targetedParkingSpot, setTargetedParkingSpot] =
    useState<FeatureItem | null>(null);
  const [currentLocation, setCurrentLocation] = useState<CoordinateItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Map
        states={{
          currentLocation,
          setCurrentLocation,
          parkingSpots,
          setParkingSpots,
          targetedParkingSpot,
          setTargetedParkingSpot,
        }}
        mapStates={{ zoom, setZoom, center, setCenter }}
      />
      {/* <TopNavigation
        states={{ setParkingSpots }}
        mapStates={{ setZoom, setCenter }}
      /> */}
      <BottomNavigation
        states={{
          parkingSpots,
          setParkingSpots,
          setCurrentLocation,
        }}
      />
    </>
  );
};

export default Content;
