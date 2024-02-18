import React from "react";
import InfoButton from "./library/buttons/InfoButton";
import ParkingListSlider from "./library/ParkingListSlider";
import TopNavigation from "./TopNavigation";
import DetailCard from "./library/DetailCard";

type Props = {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapNavigation = ({ isSearching, setIsSearching }: Props) => {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-between p-md box-border">
      <TopNavigation setIsSearching={setIsSearching} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full w-max-[550px] h-fit py-md z-50 pointer-events-none">
        <div className="relative px-md flex flex-col gap-2 w-full max-w-[600px]">
          <InfoButton />
          <DetailCard />
        </div>
        {isSearching && <ParkingListSlider />}
      </div>
    </div>
  );
};

export default MapNavigation;
