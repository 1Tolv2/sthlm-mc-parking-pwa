import React from "react";
import getParkingRates from "../../utils/getParkingRates";
import { useParkingContext } from "../../context/ParkingContext";

const ParkingDetails = () => {
  const { targetedParkingSpot } = useParkingContext();

  type Rates = { time: string[]; fee: number; note: string };

  const formatRates = (key: string, rate: Rates) => {
    return (
      <li
        className="mb-sm"
        // key={targetedParkingSpot?.properties?.ADDRESS + "-" + key}
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
        {rate.fee >= 0 && (
          <span className="ml-sm">
            {rate.fee.toString().replace(".", ",") + " kr/tim"}
          </span>
        )}
      </li>
    );
  };

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

export default ParkingDetails;
