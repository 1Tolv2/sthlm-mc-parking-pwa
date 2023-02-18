import React, { useState } from "react";
import Icons from "../atoms/Icons";
import StandardContainer from "../atoms/StandardContainer";
import { getParkingSpots } from "../api";

export default function LocationButton() {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );

  const handleLocation = async (): Promise<void> => {
    setIcon("locationOn");
    const data = await getParkingSpots();
    console.log(data);
  };

  return (
    <div className="flex justify-end w-full mx-auto max-w-[500px]">
      <StandardContainer
        padding="none"
        height=""
        width=""
        className="w-[54px] h-[54px]"
      >
        <div
          onClick={handleLocation}
          className="h-full w-full p-sm cursor-pointer"
        >
          <Icons icon={icon} />
        </div>
      </StandardContainer>
    </div>
  );
}
