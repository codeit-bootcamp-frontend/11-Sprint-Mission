/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷
 * @param {*} date
 * @returns YYYY.MM.DD로 포매팅된 문자열
 */
const formatDate = (date) => {
  return date.split("T")[0].replace(/-/g, ".");
};

const calculateGapHour = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const differenceInMinutes = Math.floor(
    (currentDate - targetDate) / (1000 * 60)
  );
  const differenceInHour = Math.floor(differenceInMinutes / 60);
  const differenceInDays = Math.floor(differenceInHour / 24);

  if (differenceInDays > 0) {
    return differenceInDays + "일 전";
  } else if (differenceInHour > 0) {
    return differenceInHour + "시간 전";
  } else {
    return differenceInMinutes + "분 전";
  }
};

export { formatDate, calculateGapHour };
