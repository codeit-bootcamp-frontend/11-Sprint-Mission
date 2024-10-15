/**
 * 각 디바이스마다 화면에 표시할 product 수 리턴
 * @param {*} width 화면 width
 * @returns
 */
const updateProductsPerPage = (width) => {
  if (width >= 1200) return 10;
  else if (width >= 768) return 6;
  else return 4;
};

export { updateProductsPerPage };
