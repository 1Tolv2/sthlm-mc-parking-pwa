import React from "react";
import AddressSearch from "./library/AddressSearch";

type Props = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNavigation = ({ setIsSearching }: Props) => {
  return (
    <div className="flex flex-col gap-2 h-fit w-full z-50">
      <AddressSearch setIsSearching={setIsSearching} />
    </div>
  );
};

export default TopNavigation;
