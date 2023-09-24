type Rates = { sundays: Rate; weekdays: Rate; saturdays: Rate };
type Rate = { time: string[]; fee: number; note: string };

/**
 * Returns what is the current rate based on what day it is and if it's within the rate time or considered "Övrig tid" aka rest
 * In Sweden days before red days (sundays and specific holidays) are considered saturdays
 * and red days are considered sundays but this is not taken in to account in the algorithm
 */
export const getCurrentRate = (
  currentDate: Date | null,
  rates: Rates
): string => {
  const currentHour = (currentDate || new Date()).getHours();
  const currentWeekday = (currentDate || new Date()).getDay();

  // checks what type of day it is
  let currentRateDay = "weekdays";
  switch (currentWeekday) {
    case 0:
      currentRateDay = "sundays";
      break;
    case 6:
      currentRateDay = "saturdays";
      break;
    default:
      currentRateDay = "weekdays";
  }

  // checks if it's within the rate time
  let currentRateTime = false;
  if (rates[currentRateDay as keyof Rates]) {
    currentRateTime =
      currentHour >= Number(rates[currentRateDay as keyof Rates].time?.[0]) &&
      currentHour < Number(rates[currentRateDay as keyof Rates].time?.[1]);
  }

  return currentRateTime ? currentRateDay : "rest";
};
