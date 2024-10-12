import { useEffect, useState } from "react";
import { getItems } from "../api.js";
import "../css/BestProduct.css";
import Product from "./Product.js";

function BestProduct() {
  const [products, setProducts] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updatePageSize = () => {
    if (window.innerWidth > 1152) {
      setPageSize(4);
    } else if (window.innerWidth > 768) {
      setPageSize(2);
    } else {
      setPageSize(1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updatePageSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoad = async (options) => {
    let result;
    try {
      result = await getItems(options);
    } catch (error) {
      console.log(error);
    }
    setProducts(result.list);
  };

  useEffect(() => {
    const options = {
      pageSize: pageSize,
      orderBy: "favorite",
    };
    handleLoad(options);
  }, [pageSize]);

  return (
    <div className="bestProducts">
      <div className="bestTitle">베스트 상품</div>
      <div className="products">
        {products && products.length > 0 ? (
          products.map(({ id, images, name, price, favoriteCount }) => (
            <Product
              key={id}
              image={images[0]}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
            />
          ))
        ) : (
          <p>상품을 찾는 중입니다..</p>
        )}
      </div>
    </div>
  );
}

export default BestProduct;
