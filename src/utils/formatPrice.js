/**
 * Number 타입의 금액을 KRW로 리턴
 * @param {*} price
 * @returns
 */
const formatPriceToKRW = (price) => {
  return price.toLocaleString("ko-KR") + "원";
};

/**
 * Input의 입력을 금액 형식으로 리턴
 * ex) 1000 -> 1,000
 * @param {*} price
 */
const formatPrice = (price) => {
  if (!price) return "";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 금액 형식의(ex: 1,000) 데이터를 API 규격에 맞게(1000) 리턴
 * @param {*} price
 * @returns
 */
const formatToPrice = (price) => {
  const removedString = price.replace(/\D/g, ""); // 숫자를 제외한 입력 삭제
  const formated = removedString.replace(/^0+/, ""); // 0으로 시작하는 경우 제거

  return formated;
};

export { formatPriceToKRW, formatPrice, formatToPrice };
