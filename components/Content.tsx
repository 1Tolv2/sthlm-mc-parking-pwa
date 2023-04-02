import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParkingContext } from "../context/ParkingContext";
import { FeatureItem } from "../types";
import Map from "./library/map/Map";
import TopNavigation from "./TopNavigation";
import MapNavigation from "./MapNavigation";
import LoadingScreen from "./library/loading/LoadingScreen";
import LoadingModal from "./library/loading/LoadingModal";
import ParkingDetailModal from "./library/ParkingDetailModal";

type Props = {
  data: FeatureItem[];
};
const Content = ({ data }: Props) => {
  const { isInitialLoading, isLoading } = useAppContext();
  const { setParkingSpots } = useParkingContext();

  useEffect(() => {
    if (data) {
      setParkingSpots(data || []);
    }
  }, []);
  return (
    <>
      {isLoading && isInitialLoading && <LoadingScreen />}
      {isLoading && !isInitialLoading && <LoadingModal />}
      <TopNavigation />
      <Map>
        <MapNavigation />
      </Map>
      <ParkingDetailModal />
    </>
  );
};

export default Content;
