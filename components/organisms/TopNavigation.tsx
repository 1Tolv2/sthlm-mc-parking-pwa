import React from "react";
import AddressSearch from "../molecules/AddressSearch";

type Props = {};

const TopNavigation = (props: Props) => {
  return (
    <div className="fixed top-md left-1/2 -translate-x-1/2 flex flex-col gap-2 w-[500px] z-50">
      <AddressSearch />
    </div>
  );
};

export default TopNavigation;
