import React from "react";
import InfoButton from "./library/buttons/InfoButton";
import ParkingListSlider from "./library/ParkingListSlider";
import TopNavigation from "./TopNavigation";
import DetailCard from "./library/DetailCard";

type Props = {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapNavigation = ({ setIsSearching }: Props) => {
  return (
    <div className="absolute top-0 left-0 h-[100dvh] w-screen flex flex-col justify-between p-sm sm:p-md box-border">
      <TopNavigation setIsSearching={setIsSearching} />
      <div className="relative w-full flex flex-col gap-2 z-50 pointer-events-none  max-w-[600px] mx-auto">
        <InfoButton />
        <DetailCard />
      </div>
      <ParkingListSlider />
    </div>
  );
};

export default MapNavigation;
