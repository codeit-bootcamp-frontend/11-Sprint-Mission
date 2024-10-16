/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷
 * @param {*} date
 * @returns YYYY.MM.DD로 포매팅된 문자열
 */
const formatDate = (date) => {
  return date.split("T")[0].replace(/-/g, ".");
};

export { formatDate };
