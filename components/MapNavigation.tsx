import React from "react";
import LocationButton from "./library/buttons/LocationButton";
import ShowAllButton from "./library/buttons/ShowAllButton";
import ParkingListSlider from "./library/ParkingListSlider";

const MapNavigation = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full h-fit py-md z-50 pointer-events-none">
      <div className="relative px-md w-full flex justify-between max-w-[500px] md:max-w-none z-[51]">
        <ShowAllButton />
        <LocationButton />
      </div>
      <ParkingListSlider />
    </div>
  );
};

export default MapNavigation;
