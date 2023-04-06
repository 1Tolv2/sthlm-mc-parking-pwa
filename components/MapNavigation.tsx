import React from "react";
import LocationButton from "./library/buttons/LocationButton";
import ShowAllButton from "./library/buttons/ShowAllButton";

const MapNavigation = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 w-full h-fit max-w-[500px] md:max-w-none p-md z-50">
      <ShowAllButton />
      <LocationButton />
    </div>
  );
};

export default MapNavigation;
