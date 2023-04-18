import React from "react";
import { useParkingContext } from "../../context/ParkingContext";

import StandardContainer from "./StandardContainer";
import ParkingDetails from "./ParkingDetails";

const ParkingListSlider = () => {
  const { parkingSpots, targetedParkingSpot } = useParkingContext();
  console.log("TARGET", parkingSpots, "clicked", targetedParkingSpot);

  return <div></div>;
};

export default ParkingListSlider;
