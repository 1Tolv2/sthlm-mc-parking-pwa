import React, { useEffect, useState } from "react";
import ExitButton from "./buttons/ExitButton";
import { useParkingContext } from "../../context/ParkingContext";
import Icons from "./Icons";
import ParkingDetails from "./ParkingDetails";

const ParkingDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { targetedParkingSpot, setTargetedParkingSpot } = useParkingContext();
  const handleModal = () => {
    if (document.getElementById("parking-detail-modal")) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleModal);
    return document.removeEventListener("click", handleModal);
  }, []);

  useEffect(() => {
    setIsModalOpen(!!targetedParkingSpot);
  }, [targetedParkingSpot]);

  const handleOpenDirections = () => {
    const lng: string =
      targetedParkingSpot?.geometry.coordinates[0][0].toString() || "";
    const lat: string =
      targetedParkingSpot?.geometry.coordinates[0][1].toString() || "";

    window.open(`https://maps.google.com/?q=${lat},${lng}`);
  };

  return (
    <>
      {isModalOpen && (
        <div className="relative md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 w-full max-w-[500px] mx-auto h-fit bg-white rounded-xl md:p-md md:drop-shadow-2xl">
          <div className="absolute top-md right-md w-fit mx-auto">
            <ExitButton
              handleOnClick={() => {
                setIsModalOpen(false);
                setTargetedParkingSpot(null);
              }}
            />
          </div>
          <div className="w-full text-left md:mb-md p-md">
            <h2 className="text-2xl font-semibold break-words mb-md w-[90%]">
              {targetedParkingSpot?.properties?.ADDRESS}
            </h2>
            {targetedParkingSpot && (
              <ParkingDetails parkingDetails={targetedParkingSpot} />
            )}
          </div>
          <div
            className="flex justify-center gap-3 w-full h-fit p-md rounded-xl bg-primary text-white cursor-pointer"
            onClick={handleOpenDirections}
          >
            <div className="relative h-8">
              <Icons color="white" icon="direction" />
            </div>
            <p className="text-lg font-medium p-px m-0">Navigera</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ParkingDetailModal;
