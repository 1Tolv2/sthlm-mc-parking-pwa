import React from "react";
import Icons from "./Icons";
import getParkingRates from "../../utils/getParkingRates";
import { useParkingContext } from "../../context/ParkingContext";

const ParkingDetails = () => {
  const { targetedParkingSpot } = useParkingContext();

  type Rates = { time: string[]; fee: number; note: string };

  const formatRateFee = (fee: number, isCurrent: boolean) => {
    return (
      fee >= 0 && (
        <span className={`ml-sm ${isCurrent ? "" : "text-gray-500"}`}>
          {fee.toString().replace(".", ",") + " kr/tim"}
        </span>
      )
    );
  };

  const renderCurrentRate = (title: string, rate: Rates) => {
    return (
      <div className="relative pl-4">
        <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-10">
          <Icons icon="rightArrow" />
        </span>
        {title && <h3 className="font-medium text-xl">{title}</h3>}
        {rate.time && (
          <span className="text-lg">
            {rate.time?.[0] + " - " + rate.time?.[1]}
          </span>
        )}
        {formatRateFee(rate.fee, true)}
        {rate.note && <span>{rate.note}</span>}
      </div>
    );
  };

  const checkIfCurrentRate = (taxDay: string, rate: Rates) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentWeekday = currentDate.getDay();
    const currentRateDay =
      (currentWeekday === 0 && taxDay === "sunday") ||
      (currentWeekday === 6 && taxDay === "saturday") ||
      (currentWeekday > 0 && currentWeekday < 6 && taxDay === "weekdays");

    const currentRateTime =
      currentHour >= Number(rate.time?.[0]) &&
      currentHour < Number(rate.time?.[1]);
    return currentRateDay && currentRateTime ? taxDay : "rest";
  };

  const formatRates = (taxDay: string, rate: Rates) => {
    const currentRate = checkIfCurrentRate(taxDay, rate);

    const title =
      taxDay === "weekdays"
        ? "Vardagar: "
        : taxDay === "saturdays"
        ? "Dagar före helgdag: "
        : taxDay === "sundays"
        ? "Helgdagar: "
        : "Övrig tid";
    return (
      <li
        className="mb-sm"
        key={targetedParkingSpot?.properties?.ADDRESS + "-" + taxDay}
      >
        {currentRate === taxDay ? (
          renderCurrentRate(title, rate)
        ) : (
          <>
            <h3 className="font-medium text-gray-500">{title}</h3>
            <span className="text-gray-500">
              {rate.time?.[0] + " - " + rate.time?.[1]}
            </span>
            {formatRateFee(rate.fee, false)}
            {rate.note && <span className={"text-gray-500"}>{rate.note}</span>}
          </>
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
      <span className="italic text-gray-500 text-center text-sm">
        Avvikelser kan förekomma, kontrollera alltid föreskrifterna på plats
      </span>
    </div>
  );
};

export default ParkingDetails;
