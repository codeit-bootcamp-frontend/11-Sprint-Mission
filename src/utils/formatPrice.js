/**
 * Number 타입의 금액을 KRW로 리턴
 * @param {*} price
 * @returns
 */
const formatPriceToKRW = (price) => {
  return price.toLocaleString("ko-KR") + "원";
};

/**
 * Input의 String 타입을 금액 형식으로 리턴
 * ex) 1000 -> 1,000
 * @param {*} price
 */
const formatPrice = (price) => {
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatToPrice = (price) => {
  if (!price) return "";
  return price.replace("/,/g", "");
};

export { formatPriceToKRW, formatPrice, formatToPrice };
