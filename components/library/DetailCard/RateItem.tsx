import React from "react";
import Icons from "../Icons";
import getHexColor from "../../../utils/getHexColor";

type Props = {
  type: "highlighted" | "regular" | "noFee";
  dayOfTheWeek: string;
  currentRate: string | null;
  rate: any;
};

const RateItem = ({ type, dayOfTheWeek, rate }: Props) => {
  type Heading = {
    [key: string]: string;
  };
  const headings: Heading = {
    weekdays: "Vardagar: ",
    saturdays: "Dagar före helgdag: ",
    sundays: "Helgdagar: ",
    rest: "Övrig tid ",
  };

  return (
    <li>
      {type === "highlighted" ? (
        <HighlightedRate heading={headings[dayOfTheWeek]} rate={rate} />
      ) : (
        <RegularRate
          heading={headings[dayOfTheWeek]}
          dayOfTheWeek={dayOfTheWeek}
          rate={rate}
        />
      )}
    </li>
  );
};

export default RateItem;

type ItemProps = {
  heading: string;
  rate: { time: string[]; fee: number; note: string };
  dayOfTheWeek?: string;
};

const RegularRate = ({ heading, rate, dayOfTheWeek }: ItemProps) => {
  return (
    <>
      <h3 className="font-medium text-gray-500 leading-5">{heading}</h3>
      {dayOfTheWeek !== "rest" && (
        <span className="text-gray-500 mr-sm text-sm sm:text-base">
          {`${rate.time?.[0]} - ${rate.time?.[1]} `}
        </span>
      )}
      {rate.fee >= 0 && (
        <span className="text-gray-500 text-sm sm:text-base">
          {rate.fee.toString().replace(".", ",") + " kr/tim"}
        </span>
      )}
      {rate.note && <span className={"text-gray-500"}>{`, ${rate.note}`}</span>}
    </>
  );
};

const HighlightedRate = ({ heading, rate }: ItemProps) => {
  return (
    <div className="relative pl-4" data-testid={"highlighted-rate"}>
      <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-10">
        <Icons icon="rightArrow" color={getHexColor("primary") ?? undefined} />
      </span>
      {heading && <h3 className="font-medium text-lg md:text-xl">{heading}</h3>}
      {rate.time && (
        <span className="text-lg mr-sm">
          {`${rate.time?.[0]} - ${rate.time?.[1]} `}
        </span>
      )}
      <span className={"text-lg"}>
        {rate.fee.toString().replace(".", ",") + " kr/tim"}
      </span>
      {rate.note && <span>{`, ${rate.note}`}</span>}
    </div>
  );
};
