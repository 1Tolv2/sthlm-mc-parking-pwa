import React, { useEffect, useState } from "react";
import { FeatureItem } from "../../../types";
import getParkingRates from "../../../utils/getParkingRates";
import { getCurrentRate } from "./getCurrentRate";
import RateItem from "./RateItem";

type Rates = { sundays: Rate; weekdays: Rate; saturdays: Rate };
type Rate = { time: string[]; fee: number; note: string };

type Props = { target: FeatureItem | null };

const Description = ({ target }: Props) => {
  const [currentRate, setCurrentRate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  // Sets current rate and updates every minute
  useEffect(() => {
    const allRates = getParkingRates(
      target?.properties?.PARKING_RATE || ""
    ) as Rates;
    setCurrentRate(getCurrentRate(currentDate, allRates));

    // check every minute to make sure it's always showing the correct rate
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, [target]);

  const rates = getParkingRates(target?.properties?.PARKING_RATE || "");
  return (
    <div className="flex flex-col pl-[10px] gap-sm">
      <ul>
        {Object.entries(rates).map(([key, value]) => {
          const type =
            currentRate === key
              ? "highlighted"
              : value.fee <= 0
              ? "noFee"
              : "regular";
          return (
            <RateItem
              key={`${target?.properties?.ADDRESS}-${key}`}
              type={type}
              dayOfTheWeek={key}
              rate={value}
              currentRate={currentRate}
            />
          );
        })}
      </ul>
      <span>{target?.properties.OTHER_INFO}</span>
    </div>
  );
};

export default Description;
