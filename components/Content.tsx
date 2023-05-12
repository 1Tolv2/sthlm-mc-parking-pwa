import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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

  const DynamicMap = dynamic(() => import("./library/map/Map"), { ssr: false });

  return (
    <>
      {isLoading && isInitialLoading && <LoadingScreen />}
      <TopNavigation setIsSearching={setIsSearching} />

      <DynamicMap>
        <MapNavigation
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </DynamicMap>

      <ParkingDetailModal />
    </>
  );
};

export default Content;
