import React from "react";
import AddressSearch from "../molecules/AddressSearch";

const TopNavigation = () => {
  return (
    <div className="fixed top-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full md:w-[500px] px-md z-50">
      <AddressSearch />
    </div>
  );
};

export default TopNavigation;
