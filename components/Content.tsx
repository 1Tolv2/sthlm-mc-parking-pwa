import React from "react";
import { useAppContext } from "../context/AppContext";
import Map from "./library/map/Map";
import TopNavigation from "./TopNavigation";
import MapNavigation from "./MapNavigation";
import LoadingScreen from "./library/loading/LoadingScreen";
import LoadingModal from "./library/loading/LoadingModal";
import ParkingDetailModal from "./library/ParkingDetailModal";

const Content = () => {
  const { isInitialLoading, isLoading } = useAppContext();

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
