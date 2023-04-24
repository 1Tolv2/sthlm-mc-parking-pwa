import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParkingContext } from "../context/ParkingContext";
import { FeatureItem } from "../types";
import Map from "./library/map/Map";
import TopNavigation from "./TopNavigation";
import MapNavigation from "./MapNavigation";
import LoadingScreen from "./library/loading/LoadingScreen";
import ParkingDetailModal from "./library/ParkingDetailModal";

type Props = {
  data: FeatureItem[];
};

const Content = ({ data }: Props) => {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { isInitialLoading, isLoading } = useAppContext();
  const { setParkingSpots } = useParkingContext();

  useEffect(() => {
    if (data && data.length > 0) setParkingSpots(data);
  }, []);

  return (
    <>
      {isLoading && isInitialLoading && <LoadingScreen />}
      <TopNavigation setIsSearching={setIsSearching} />
      <Map>
        <MapNavigation isSearching={isSearching} />
      </Map>
      <ParkingDetailModal />
    </>
  );
};

export default Content;
