const getPageLimit = () => {
  if (window.innerWidth <= 767) return [1, 4];
  if (window.innerWidth <= 1199) return [2, 6];
  return [4, 10];
};

export {getPageLimit};