import React, { useEffect, useState } from "react";
import { FeatureItem } from "../../types";
import StandardContainer from "../atoms/StandardContainer";

type Props = {
  data: FeatureItem;
  states: {
    targetedParkingSpot: FeatureItem | null;
    modalPosition: { x: number; y: number } | null;
  };
};

const ParkingDetailModal = ({ data, states }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const firstLetterToUpperCase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { targetedParkingSpot, modalPosition } = states;

  useEffect(() => {
    setIsModalOpen(data.id === targetedParkingSpot?.id);
  }, [targetedParkingSpot, modalPosition]);

  const handleOpenDirections = () => {
    console.log("CLICKED", data.geometry.coordinates[0]);
  };

  const formatRegulations = () => {
    const properties = data?.properties;

    properties?.PARKING_RATE;
    const splitString = properties?.PARKING_RATE?.split(": ");
    const rate = splitString?.[0] || "";
    const regulations = splitString?.[1]?.split(/(?<=\.)\s/);
    return (
      <div className="flex flex-col gap-md">
        <p className="text-lg font-semibold">{firstLetterToUpperCase(rate)}</p>
        <ul>
          {regulations?.map((item, index) => (
            <li key={index} className="mb-md">
              {item}
            </li>
          ))}
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
          style={{
            top: `${modalPosition?.y || 0}vh`,
            left: `${modalPosition?.x || 0}vw`,
          }}
          className="fixed z-60 w-max h-fit"
        >
          <StandardContainer>
            <div className="flex max-w-[250px]">
              <div>
                <h2 className="text-2xl mb-md">{data?.properties?.ADDRESS}</h2>
                {formatRegulations()}
              </div>
              <div
                className="cursor-pointer h-fit"
                onClick={handleOpenDirections}
              >
                {renderMapIcon()}
              </div>
            </div>
          </StandardContainer>
        </div>
      )}
    </>
  );
};

export default ParkingDetailModal;
