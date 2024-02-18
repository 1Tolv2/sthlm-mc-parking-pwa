import React from "react";
import AddressSearch from "./library/AddressSearch";
import LocationButton from "./library/buttons/LocationButton";

type Props = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNavigation = ({ setIsSearching }: Props) => {
  return (
    <div className="flex flex-col gap-2 h-fit w-full z-50">
      <AddressSearch setIsSearching={setIsSearching} />
      <LocationButton />
    </div>
  );
};

export default TopNavigation;
