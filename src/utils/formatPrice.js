/**
 * Number 타입의 금액을 KRW로 리턴
 * @param {*} price
 * @returns
 */
const formatPriceToKRW = (price) => {
  return price.toLocaleString("ko-KR") + "원";
};

export default formatPriceToKRW;
