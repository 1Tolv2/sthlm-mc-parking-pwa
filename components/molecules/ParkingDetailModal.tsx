import React, { useEffect, useState } from "react";
import { FeatureItem } from "../../types";
import StandardContainer from "../atoms/StandardContainer";
import getParkingRates from "../../utils/getParkingRates";
import ExitButton from "../atoms/ExitButton";

type Props = {
  data: FeatureItem;
  states: {
    targetedParkingSpot: FeatureItem | null;
    modalPosition: { x: number; y: number } | null;
  };
};

const ParkingDetailModal = ({ data, states }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { targetedParkingSpot, modalPosition } = states;
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
    setIsModalOpen(data.id === targetedParkingSpot?.id);
  }, [targetedParkingSpot, modalPosition]);

  const handleOpenDirections = () => {
    const lng: string = data.geometry.coordinates[0][0].toString();
    const lat: string = data.geometry.coordinates[0][1].toString();

    window.open(`https://maps.google.com/?q=${lat},${lng}`);
  };

  const formatRates = (key: string, rate: Rates) => {
    return (
      <li className="mb-sm" key={data?.properties?.ADDRESS + "-" + key}>
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
    const rates = getParkingRates(data?.properties?.PARKING_RATE);

    return (
      <div className="flex flex-col gap-md">
        <ul>
          {Object.entries(rates).map(([key, value]) =>
            formatRates(key, value as Rates)
          )}
        </ul>
      </div>
    );
  };

  const renderMapIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path
          fill="#3F75FF"
          d="m612 936-263-93-179 71q-17 9-33.5-1T120 883V325q0-13 7.5-23t19.5-15l202-71 263 92 178-71q17-8 33.5 1.5T840 268v565q0 11-7.5 19T814 864l-202 72Zm-34-75V356l-196-66v505l196 66Z"
        />
      </svg>
    );
  };

  return (
    <>
      {isModalOpen && (
        <div
          // style={{
          //   top: `${modalPosition?.y || 0}vh`,
          //   left: `${modalPosition?.x || 0}vw`,
          // }}
          id="parking-detail-modal"
          className="fixed bottom-md left-md z-50 w-max h-fit"
        >
          <StandardContainer>
            <div className="flex w-[250px] min-h-[120px] justify-between">
              <div>
                <h2 className="text-xl break-words mb-md">
                  {data?.properties?.ADDRESS}
                </h2>
                {renderRates()}
              </div>
              <div className="flex flex-col justify-between">
                <div className="relative w-fit mx-auto">
                  <ExitButton handleOnClick={() => setIsModalOpen(false)} />
                </div>
                <div
                  className="cursor-pointer h-fit"
                  onClick={handleOpenDirections}
                >
                  {renderMapIcon()}
                </div>
              </div>
            </div>
          </StandardContainer>
        </div>
      )}
    </>
  );
};

export default ParkingDetailModal;
