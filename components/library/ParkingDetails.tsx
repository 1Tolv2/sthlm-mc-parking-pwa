import React, { useEffect, useState } from "react";
import Icons from "./Icons";
import getParkingRates from "../../utils/getParkingRates";
import { FeatureItem } from "../../types";

type Props = {
  parkingDetails: FeatureItem;
};

const ParkingDetails = ({ parkingDetails }: Props) => {
  const [currentRate, setCurrentRate] = useState<string | null>(null);

  type Rates = { sundays: Rate; weekdays: Rate; saturdays: Rate };
  type Rate = { time: string[]; fee: number; note: string };

  const checkCurrentRate = (rates: Rates): void => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentWeekday = currentDate.getDay();

    const currentRateDay =
      currentWeekday === 0
        ? "sundays"
        : currentWeekday === 6
        ? "saturdays"
        : "weekdays";

    let currentRateTime = false;
    if (rates[currentRateDay]) {
      currentRateTime =
        currentHour >= Number(rates[currentRateDay].time?.[0]) &&
        currentHour < Number(rates[currentRateDay].time?.[1]);
    }

    setCurrentRate(currentRateTime ? currentRateDay : "rest");
  };

  useEffect(() => {
    checkCurrentRate(
      getParkingRates(parkingDetails?.properties?.PARKING_RATE || "") as Rates
    );
  }, []);
  const formatRateFee = (fee: number, isCurrent: boolean) => {
    return (
      fee >= 0 && (
        <span className={`${isCurrent ? "text-lg" : "text-gray-500"}`}>
          {fee.toString().replace(".", ",") + " kr/tim"}
        </span>
      )
    );
  };

  const renderCurrentRate = (title: string, rate: Rate) => {
    return (
      <div className="relative pl-4">
        <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-10">
          <Icons icon="rightArrow" />
        </span>
        {title && <h3 className="font-medium text-lg md:text-xl">{title}</h3>}
        {rate.time && (
          <span className="text-lg mr-sm">
            {rate.time?.[0] + " - " + rate.time?.[1]}
          </span>
        )}
        {formatRateFee(rate.fee, true)}
        {rate.note && <span>{`, ${rate.note}`}</span>}
      </div>
    );
  };

  const formatRates = (taxDay: string, rate: Rate) => {
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
        key={parkingDetails?.properties?.ADDRESS + "-" + taxDay}
      >
        {currentRate === taxDay ? (
          renderCurrentRate(title, rate)
        ) : (
          <>
            <h3 className="font-medium text-gray-500">{title}</h3>
            {taxDay !== "rest" && (
              <span className="text-gray-500 mr-sm">
                {rate.time?.[0] + " - " + rate.time?.[1]}
              </span>
            )}
            {formatRateFee(rate.fee, false)}
            {rate.note && (
              <span className={"text-gray-500"}>{`, ${rate.note}`}</span>
            )}
          </>
        )}
      </li>
    );
  };

  const rates = getParkingRates(parkingDetails?.properties?.PARKING_RATE || "");
  return (
    <div className="flex flex-col gap-sm md:gap-md pl-[10px]">
      <ul>
        {Object.entries(rates).map(([key, value]) => {
          return formatRates(key, value as Rate);
        })}
      </ul>
      <span>{parkingDetails.properties.OTHER_INFO}</span>
      <span className="italic text-gray-500 text-center text-xs md:text-sm">
        Avvikelser kan förekomma, kontrollera alltid föreskrifterna på plats
      </span>
    </div>
  );
};

export default ParkingDetails;
