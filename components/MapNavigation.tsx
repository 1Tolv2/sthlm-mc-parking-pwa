import React from "react";
import LocationButton from "./library/buttons/LocationButton";
import ShowAllButton from "./library/buttons/ShowAllButton";
import ParkingListSlider from "./library/ParkingListSlider";

const MapNavigation = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full h-fit max-w-[500px] md:max-w-none p-md z-50 pointer-events-none">
      <div className="relative w-full flex justify-between z-[51]">
        <ShowAllButton />
        <LocationButton />
      </div>
      <ParkingListSlider />
    </div>
  );
};

export default MapNavigation;
