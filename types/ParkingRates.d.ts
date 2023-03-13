export interface ParkingRates {
  [key: string]: {
    [key in "saturdays" | "sundays" | "weekdays" | "rest"]?: {
      time?: [string, string];
      price: number;
      note?: string;
    };
  };
}
