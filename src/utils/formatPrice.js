const formatPriceToKRW = (price) => {
  return price.toLocaleString("ko-KR") + "원";
};

export default formatPriceToKRW;
