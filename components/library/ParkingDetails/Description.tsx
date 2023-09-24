import React, { useEffect, useState } from "react";
import { FeatureItem } from "../../../types";
import Icons from "../Icons";
import getParkingRates from "../../../utils/getParkingRates";
import { getCurrentRate } from "./getCurrentRate";

type Props = { target: FeatureItem | null };

const Description = ({ target }: Props) => {
  const [currentRate, setCurrentRate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  type Rates = { sundays: Rate; weekdays: Rate; saturdays: Rate };
  type Rate = { time: string[]; fee: number; note: string };

  useEffect(() => {
    setCurrentRate(
      getCurrentRate(
        currentDate,
        getParkingRates(target?.properties?.PARKING_RATE || "") as Rates
      )
    );
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, [target]);

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
      <li className="mb-sm" key={target?.properties?.ADDRESS + "-" + taxDay}>
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

  const rates = getParkingRates(target?.properties?.PARKING_RATE || "");
  return (
    <div className="flex flex-col pl-[10px] gap-sm">
      <ul>
        {Object.entries(rates).map(([key, value]) => {
          return formatRates(key, value as Rate);
        })}
      </ul>
      <span>{target?.properties.OTHER_INFO}</span>
      <span className="italic text-gray-500 text-center text-xs md:text-sm mt-sm md:mt-md">
        Avvikelser kan förekomma, kontrollera alltid föreskrifterna på plats
      </span>
    </div>
  );
};

export default Description;
