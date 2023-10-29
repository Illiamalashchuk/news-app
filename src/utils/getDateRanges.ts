import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DateRange } from "@/types";

dayjs.extend(utc);

export function getDateRanges() {
  const current = dayjs().utc();
  return {
    [DateRange.Hour]: {
      from: dayjs().hour(1).utc(),
      to: current,
      timeframe: 1,
    },
    [DateRange.SixHours]: {
      from: dayjs().hour(6).utc(),
      to: current,
      timeframe: 6,
    },

    [DateRange.Day]: {
      from: dayjs().hour(24).utc(),
      to: current,
      timeframe: 24,
    },
  };
}
