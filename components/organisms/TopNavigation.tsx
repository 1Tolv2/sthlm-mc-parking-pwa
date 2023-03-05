import React from "react";
import { CoordinateItem, FeatureItem } from "../../types";
import AddressSearch from "../molecules/AddressSearch";

type Props = {
  states: { setParkingSpots: (parkingSpots: FeatureItem[]) => void };
  mapStates: {
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    setCenter: React.Dispatch<React.SetStateAction<CoordinateItem | null>>;
  };
};

const TopNavigation = (props: Props) => {
  return (
    <div className="fixed top-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[500px] z-50">
      <AddressSearch {...props} />
    </div>
  );
};

export default TopNavigation;
