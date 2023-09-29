import React from "react";

import { useParkingContext } from "../../../context/ParkingContext";
import { useAppContext } from "../../../context/AppContext";
import { useMapContext } from "../../../context/MapContext";

import StandardContainer from "../StandardContainer";

type Props = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowAllButton = ({ setIsSearching }: Props) => {
  const { setIsLoading } = useAppContext();
  const { resetParking } = useParkingContext();
  const { resetMap } = useMapContext();

  /**
   * @description Resets the map to overview and all features are displayed
   */
  const handleParkingSpots = async (): Promise<void> => {
    setIsLoading(true);
    resetMap();
    resetParking();
    setIsLoading(false);
    setIsSearching(false);
  };

  return (
    <StandardContainer shadow padding="0" width="w-fit" height="h-[54px]">
      <button
        className="w-max h-full font-semibold pointer-events-auto p-md"
        onClick={handleParkingSpots}
      >
        Visa alla parkeringar
      </button>
    </StandardContainer>
  );
};

export default ShowAllButton;
