import { ParkingRates } from "../types";

// Rates are changing on 1 April 2023, hence the two objects
const parkingRates = {
  beforeApril: {
    "taxa 11": {
      rest: { fee: 10, note: "Alla dagar" },
    },
    "taxa 12": {
      weekdays: { time: ["07.00", "21.00"], fee: 6.5 },
      saturdays: { time: ["09.00", "19.00"], fee: 6.5 },
      sundays: { time: ["09.00", "19.00"], fee: 6.5 },
      rest: { fee: 4 },
    },
    "taxa 13": {
      weekdays: { time: ["07.00", "19.00"], fee: 4 },
      saturdays: { time: ["11.00", "17.00"], fee: 2.5 },
      rest: { fee: 0 },
    },
    "taxa 14": {
      weekdays: { time: ["07.00", "19.00"], fee: 2.5 },
      saturdays: { time: ["11.00", "17.00"], fee: 2.5 },
      rest: { fee: 0 },
    },
    "taxa 15": {
      weekdays: { time: ["07.00", "19.00"], fee: 2.5 },
      rest: { fee: 0 },
    },
  } as ParkingRates,
  afterApril: {
    "taxa 11": {
      rest: { fee: 13.75, note: "Parkering maxtid 1h" },
    },
    "taxa 12": {
      weekdays: { time: ["07.00", "21.00"], fee: 7.75 },
      saturdays: { time: ["09.00", "19.00"], fee: 7.75 },
      sundays: { time: ["09.00", "19.00"], fee: 7.75 },
      rest: { fee: 5 },
    },
    "taxa 13": {
      weekdays: { time: ["07.00", "19.00"], fee: 5 },
      saturdays: { time: ["11.00", "17.00"], fee: 3.75 },
      rest: { fee: 0 },
    },
    "taxa 14": {
      weekdays: { time: ["07.00", "19.00"], fee: 2.5 },
      saturdays: { time: ["11.00", "17.00"], fee: 2.5 },
      rest: { fee: 0 },
    },
    "taxa 15": {
      weekdays: { time: ["07.00", "19.00"], fee: 2.5 },
      rest: { fee: 0 },
    },
  } as ParkingRates,
};

export default function getParkingRates(
  rules: string
): ParkingRates[keyof ParkingRates] {
  const rate = /taxa \d{2}/.exec(rules)?.toString();
  if (!rate) return { rest: { fee: 0, note: "Avgiftsfri" } };
  console.log(new Date().getMonth(), "DATE");
  const currentRates =
    parkingRates[new Date().getMonth() >= 3 ? "afterApril" : "beforeApril"];
  return (
    currentRates[rate as unknown as keyof ParkingRates] || {
      rest: { fee: 0, note: "Okänd" },
    }
  );
}
