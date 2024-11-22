import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, } from "date-fns";

export const TimestampCal = (dateString: Date) => {
  const date = new Date(dateString);
  const now = new Date();

  const Day = differenceInDays(now, date); 
  const Hour = differenceInHours(now, date); 
  const Minute = differenceInMinutes(now, date); 
  const Sec = differenceInSeconds(now, date); 

  if (Sec < 60) return "방금 전"; 
  else if (Minute < 60) return `${Minute}분 전`; 
  else if (Hour < 24) return `${Hour}시간 전`; 
  else if (Day < 7) return `${Day}일 전`;
  else return format(date, "yyyy.MM.dd hh:mm a");
};