import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";

const standardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

const toDateStandard = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const hour = "hour" in date ? standardTime(date.hour) : Number("00");
  const minute = "minute" in date ? standardTime(date.minute) : Number("00");
  const second = "second" in date ? standardTime(date.second) : Number("00");

  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

export { toDateStandard, toInputDate };
