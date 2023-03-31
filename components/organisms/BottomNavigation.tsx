import React from "react";
import LocationButton from "../molecules/LocationButton";

const BottomNavigation = () => {
  return (
    <div className="absolute bottom-0 right-0 flex flex-col gap-2 w-full h-fit m-sm md:w-[500px] z-50">
      <LocationButton />
    </div>
  );
};

export default BottomNavigation;
