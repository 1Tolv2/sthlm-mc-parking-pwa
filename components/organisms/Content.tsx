import React from "react";
import { useAppContext } from "../../context/AppContext";
import Map from "../molecules/Map";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";
import LoadingScreen from "../molecules/loadingComponents/LoadingScreen";
import LoadingModal from "../molecules/loadingComponents/LoadingModal";

const Content = () => {
  const { isInitialLoading, isLoading } = useAppContext();

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
