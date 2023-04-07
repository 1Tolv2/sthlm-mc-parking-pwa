import React from "react";
import { useMapContext } from "../../../context/MapContext";
import { useParkingContext } from "../../../context/ParkingContext";
import { useAppContext } from "../../../context/AppContext";
import StandardContainer from "../StandardContainer";

const ShowAllButton = () => {
  const { setIsLoading } = useAppContext();
  const { resetParking } = useParkingContext();
  const { resetMap } = useMapContext();

  const handleParkingSpots = async (): Promise<void> => {
    setIsLoading(true);
    resetParking();
    resetMap();
    setIsLoading(false);
  };

  return (
    <StandardContainer
      padding="0"
      width="w-fit"
      height="h-[54px]"
      className="drop-shadow md:drop-shadow-2xl"
    >
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
