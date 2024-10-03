const getBreakpoint = (width) => {
  if (width >= 1200) {
    return "pc";
  } else if (width >= 768) {
    return "tablet";
  } else {
    return "mobile";
  }
};

const updateProductsPerPage = (device) => {
  if (device === "pc") {
    // setProductsPerPage(10);
    return 10;
  } else if (device === "tablet") {
    // setProductsPerPage(6);
    return 6;
  } else {
    // setProductsPerPage(4);
    return 4;
  }
};

export { getBreakpoint, updateProductsPerPage };
