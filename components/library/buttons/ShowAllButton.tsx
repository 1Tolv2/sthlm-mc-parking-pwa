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
    <StandardContainer className="drop-shadow md:drop-shadow-2xl" width="w-fit">
      <button
        className="w-max h-full font-semibold"
        onClick={handleParkingSpots}
      >
        Visa alla parkeringar
      </button>
    </StandardContainer>
  );
};

export default ShowAllButton;
