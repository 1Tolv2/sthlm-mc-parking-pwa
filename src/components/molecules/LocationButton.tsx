import React, { useState } from "react";
import Icons from "../atoms/Icons";
import StandardContainer from "../atoms/StandardContainer";

export default function LocationButton() {
  const [icon, setIcon] = useState(
    "locationOff" as "locationOff" | "locationOn"
  );

  const handleLocation = () => {
    setIcon("locationOn");
  };

  return (
    <div className="flex justify-end w-full mx-auto max-w-[500px]">
      <StandardContainer padding="none" className="w-[54px] h-[54px]">
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
