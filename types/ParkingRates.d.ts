export interface ParkingRates {
  [key: string]: {
    [key in "saturdays" | "sundays" | "weekdays" | "rest"]?: {
      time?: [string, string];
      fee: number;
      note?: string;
    };
  };
}
