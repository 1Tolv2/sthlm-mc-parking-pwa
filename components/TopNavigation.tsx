import React from "react";
import AddressSearch from "./library/AddressSearch";

const TopNavigation = () => {
  return (
    <div className="flex flex-col gap-2 h-fit w-full md:w-[500px] z-50">
      <AddressSearch />
    </div>
  );
};

export default TopNavigation;
