import { ParkingRates } from "../types";

// Rates are changing on 1 April 2023, hence the two objects
const parkingRates = {
  beforeApril: {
    "taxa 11": {
      rest: { price: 10 },
    },
    "taxa 12": {
      weekdays: { time: ["07.00", "21.00"], price: 6.5 },
      saturdays: { time: ["09.00", "19.00"], price: 6.5 },
      sundays: { time: ["09.00", "19.00"], price: 6.5 },
      rest: { price: 4 },
    },
    "taxa 13": {
      weekdays: { time: ["07.00", "19.00"], price: 4 },
      saturdays: { time: ["11.00", "17.00"], price: 2.5 },
      rest: { price: 0 },
    },
    "taxa 14": {
      weekdays: { time: ["07.00", "19.00"], price: 2.5 },
      saturdays: { time: ["11.00", "17.00"], price: 2.5 },
      rest: { price: 0 },
    },
    "taxa 15": {
      weekdays: { time: ["07.00", "19.00"], price: 2.5 },
      rest: { price: 0 },
    },
  } as ParkingRates,
  afterApril: {
    "taxa 11": {
      rest: { price: 13.75, note: "Parkering maxtid 1h" },
    },
    "taxa 12": {
      weekdays: { time: ["07.00", "21.00"], price: 7.75 },
      saturdays: { time: ["09.00", "19.00"], price: 7.75 },
      sundays: { time: ["09.00", "19.00"], price: 7.75 },
      rest: { price: 5 },
    },
    "taxa 13": {
      weekdays: { time: ["07.00", "19.00"], price: 5 },
      saturdays: { time: ["11.00", "17.00"], price: 3.75 },
      rest: { price: 0 },
    },
    "taxa 14": {
      weekdays: { time: ["07.00", "19.00"], price: 2.5 },
      saturdays: { time: ["11.00", "17.00"], price: 2.5 },
      rest: { price: 0 },
    },
    "taxa 15": {
      weekdays: { time: ["07.00", "19.00"], price: 2.5 },
      rest: { price: 0 },
    },
  } as ParkingRates,
};

export default function getParkingRates(
  rules: string
): ParkingRates[keyof ParkingRates] {
  const rate = /taxa \d{2}/.exec(rules)?.toString();
  const currentRates =
    parkingRates[new Date().getMonth() > 3 ? "afterApril" : "beforeApril"];
  return currentRates[rate as unknown as keyof ParkingRates];
}
