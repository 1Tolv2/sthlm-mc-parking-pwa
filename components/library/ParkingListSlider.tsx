import React from "react";
import { useParkingContext } from "../../context/ParkingContext";

import StandardContainer from "./StandardContainer";
import ParkingDetails from "./ParkingDetails";

const ParkingListSlider = () => {
  const { parkingSpots, targetedParkingSpot } = useParkingContext();
  console.log("TARGET", parkingSpots, "clicked", targetedParkingSpot);

  return !targetedParkingSpot && parkingSpots.length <= 10 ? (
    <></>
  );
};

export default ParkingListSlider;
