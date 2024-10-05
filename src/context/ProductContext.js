import { createContext, useContext } from "react";

const ProductContext = createContext();

export const useProductSettings = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children, imageSize, countSize }) => {
  return <ProductContext.Provider value={{ imageSize, countSize }}>{children}</ProductContext.Provider>;
};
