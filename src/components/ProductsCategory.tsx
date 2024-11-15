import React, { ReactNode } from 'react';
import './ProductsCategory.css';

interface CategoryProp {
  children: ReactNode;
}

function ProductsCategory({ children }: CategoryProp) {
  return <h2>{children}</h2>;
}

export default ProductsCategory;
