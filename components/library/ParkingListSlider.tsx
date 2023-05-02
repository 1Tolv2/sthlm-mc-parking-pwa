import React from "react";
import { FeatureItem } from "../../types";
import { useParkingContext } from "../../context/ParkingContext";

import StandardContainer from "./StandardContainer";
import ParkingDetails from "./ParkingDetails";
import Icons from "./Icons";

const ParkingListSlider = () => {
  const { parkingSpots, targetedParkingSpot } = useParkingContext();

  const handleOpenDirections = (targetedParkingSpot: FeatureItem) => {
    const lng: string =
      targetedParkingSpot?.geometry.coordinates[0][0].toString() || "";
    const lat: string =
      targetedParkingSpot?.geometry.coordinates[0][1].toString() || "";

    window.open(`https://maps.google.com/?q=${lat},${lng}`);
  };

  return !targetedParkingSpot && parkingSpots?.length <= 10 ? (
    <>
      <div className="relative w-full overflow-x-scroll touch-pan-x z-[100] pointer-events-auto pl-md pr-md md:pl-[calc(50vw-204px)]">
        <ul className="flex gap-2 pointer-events-auto w-fit">
          {parkingSpots.map((parkingSpot) => (
            <li
              key={"list-item-" + parkingSpot.id}
              className="block relative bg-primary w-[330px] md:w-[400px] rounded-xl z-[52]"
            >
              <h3 className="text-xl md:text-2xl font-medium text-white px-md py-2 md:py-3 w-full">
                {parkingSpot.properties.ADDRESS}
              </h3>
              <StandardContainer className="" width="w-full">
                <div className="flex flex-col md:flex-row items-end gap-md">
                  <ParkingDetails parkingDetails={parkingSpot} />
                  <div
                    className="hidden md:block h-16 cursor-pointer"
                    onClick={() => handleOpenDirections(parkingSpot)}
                  >
                    <Icons icon="direction" />
                  </div>
                  <div
                    className="flex md:hidden justify-center gap-3 w-full h-fit p-2.5 rounded-xl bg-primary text-white cursor-pointer"
                    onClick={() => handleOpenDirections(parkingSpot)}
                  >
                    <div className="relative h-8">
                      <Icons color="white" icon="direction" />
                    </div>
                    <p className="text-lg font-medium p-px m-0">Navigera</p>
                  </div>
                </div>
              </StandardContainer>
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ParkingListSlider;
