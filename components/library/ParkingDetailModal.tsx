import React, { useEffect, useState } from "react";
import getParkingRates from "../../utils/getParkingRates";
import ExitButton from "./buttons/ExitButton";
import { useParkingContext } from "../../context/ParkingContext";

const ParkingDetailModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { targetedParkingSpot } = useParkingContext();
  const handleModal = () => {
    console.log("MODAL", document.getElementById("parking-detail-modal"));
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

  const formatRates = (key: string, rate: Rates) => {
    return (
      <li
        className="mb-sm"
        key={targetedParkingSpot?.properties?.ADDRESS + "-" + key}
      >
        {key === "weekdays" ? (
          <>
            <h3 className="hidden sm:block">Vardagar: </h3>
            <span>{rate.time?.[0] + " - " + rate.time?.[1]}</span>
          </>
        ) : key === "saturdays" ? (
          <>
            <h3 className="hidden sm:block">Dagar före helgdag: </h3>
            <span>{`(${rate.time?.[0]} - ${rate.time?.[1]})`}</span>
          </>
        ) : key === "sundays" ? (
          <>
            <h3 className="hidden sm:block">Helgdagar:</h3>
            <span className="text-unavailable-800">
              {`${rate.time?.[0]} - ${rate.time?.[1]}`}
            </span>
          </>
        ) : (
          <></>
        )}
        {rate.note && <span>{rate.note}</span>}
        {rate.fee > 0 && (
          <span className="ml-sm">
            {rate.fee.toString().replace(".", ",") + " kr/tim"}
          </span>
        )}
      </li>
    );
  };

  type Rates = { time: string[]; fee: number; note: string };
  const renderRates = () => {
    const rates = getParkingRates(
      targetedParkingSpot?.properties?.PARKING_RATE || ""
    );

    return (
      <div className="flex flex-col gap-md pl-[10px]">
        <ul>
          {Object.entries(rates).map(([key, value]) =>
            formatRates(key, value as Rates)
          )}
        </ul>
      </div>
    );
  };

  return (
    <>
      {isModalOpen && (
        <div className="relative w-full max-w-[500px] mx-auto h-fit">
          <div className="absolute top-md right-md w-fit mx-auto">
            <ExitButton handleOnClick={() => setIsModalOpen(false)} />
          </div>
          <div className="w-full text-left mb-md p-md">
            <h2 className="text-2xl font-semibold break-words mb-md w-[90%]">
              {targetedParkingSpot?.properties?.ADDRESS}
            </h2>
            {renderRates()}
          </div>
          <div
            className="w-full h-fit text-center p-md rounded-xl bg-primary text-white cursor-pointer"
            onClick={handleOpenDirections}
          >
            Navigera
          </div>
        </div>
      )}
    </>
  );
};

export default ParkingDetailModal;
