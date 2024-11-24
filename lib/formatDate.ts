/**
 * 날짜 포맷팅
 * @param {string | number} timestamp - 날짜 문자열 또는 숫자
 * @param {string} joinText - 날짜 구분자
 * @returns {string} 날짜 포맷팅 문자열
 */
const formatDate = (timestamp: string | number, joinText: string = '.'): string => {
  const d = new Date(timestamp);
  return d.toISOString().slice(0, 10).split('-').join(joinText);
};

export default formatDate;
