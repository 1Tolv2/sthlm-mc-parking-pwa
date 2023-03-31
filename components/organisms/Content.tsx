import React from "react";
import { useAppContext } from "../../context/AppContext";
import Map from "../molecules/Map";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";
import LoadingScreen from "../molecules/loadingComponents/LoadingScreen";
import LoadingModal from "../molecules/loadingComponents/LoadingModal";
import ParkingDetailModal from "../molecules/ParkingDetailModal";
import { useParkingContext } from "../../context/ParkingContext";

const Content = () => {
  const { isInitialLoading, isLoading } = useAppContext();

  return (
    <>
      {/* {isLoading && isInitialLoading && <LoadingScreen />}
      {isLoading && !isInitialLoading && <LoadingModal />} */}
      <TopNavigation />
      <Map>
        <BottomNavigation />
      </Map>
      <ParkingDetailModal />
    </>
  );
};

export default Content;
