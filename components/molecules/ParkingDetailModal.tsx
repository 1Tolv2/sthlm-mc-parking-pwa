import React, { useContext } from "react";
import StandardContainer from "../atoms/StandardContainer";
import { ParkingContext } from "../Layout/Layout";

const ParkingDetailModal = () => {
  const { currentParkingSpot } = useContext(ParkingContext);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 z-50">
      <StandardContainer>ParkingDetailModal</StandardContainer>
    </div>
  );
};

export default ParkingDetailModal;
