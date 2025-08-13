import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

const standardDate = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  } else {
    return date;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? date.hour : Number("00");
  const minute = "minute" in date ? date.minute : Number("00");
  const second = "second" in date ? date.second : Number("00");

  const result = `${standardDate(year)}-${standardDate(month)}-${standardDate(day)} ${standardDate(hour)}:${standardDate(minute)}:${standardDate(second)}`;

  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

export { toDateStandard, toInputDate };
