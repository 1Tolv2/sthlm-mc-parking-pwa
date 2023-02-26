import React from "react";
// import MenuBar from "../molecules/MenuBar";
import LocationButton from "../molecules/LocationButton";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[500px]">
      <LocationButton />
      {/* <MenuBar /> */}
    </div>
  );
};

export default BottomNavigation;
