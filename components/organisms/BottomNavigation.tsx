import React from "react";
import LocationButton from "../molecules/LocationButton";
// import MenuBar from "../molecules/MenuBar";

type Props = {
  states: any;
};

const BottomNavigation = (props: Props) => {
  return (
    <div className="fixed bottom-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[500px]">
      <LocationButton {...props} />
      {/* <MenuBar /> */}
    </div>
  );
};

export default BottomNavigation;
