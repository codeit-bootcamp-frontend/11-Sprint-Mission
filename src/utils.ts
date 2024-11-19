/**
 * 날짜 형식에 맞춰 반환
 * @param {string} date 날짜 문자열
 * @param {string} joinText 연결 문자열
 * @return {string} 형식에 맞춘 날짜
 */
function getFormatDate(date: string, joinText: string = '. '): string {
  const d: Date = new Date(date);
  return d.toISOString().slice(0, 10).split('-').join(joinText);
}

export { getFormatDate };
