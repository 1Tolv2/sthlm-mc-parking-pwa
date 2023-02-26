import React, { useEffect, useState } from "react";
import { FeatureItem } from "../../types";
import StandardContainer from "../atoms/StandardContainer";

type Props = {
  data: FeatureItem;
  states: { targetedParkingSpot: FeatureItem | null };
};

const ParkingDetailModal = ({ data, states }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const firstLetterToUpperCase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const { targetedParkingSpot } = states;

  useEffect(() => {
    setIsModalOpen(data.id === targetedParkingSpot?.id);
  }, [targetedParkingSpot]);

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

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-1/2 right-[10px] -translate-y-1/2 z-60 w-max h-fit">
          <StandardContainer>
            <div className="max-w-[200px]">
              <h2 className="text-2xl mb-md">{data?.properties?.ADDRESS}</h2>
              {formatRegulations()}
            </div>
          </StandardContainer>
        </div>
      )}
    </>
  );
};

export default ParkingDetailModal;
