import React, { useEffect, useState } from "react";
import { getProducts } from "../api/api.js";
import "../css/FavoriteItem.css";

const FavoriteItem = () => {
  const [products, setProducts] = useState([]); // 제품 리스트 저장 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchProducts = async () => {
      let result;
      try {
        setLoading(true);
        result = await getProducts({
          page: 1,
          pageSize: 4,
          orderBy: "favorite",
          keyword: "",
        });
        console.log(result);
        setProducts(result.list);
      } catch (err) {
        setError(err.message);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <p>Error: {error}</p>; // 에러 발생 시 표시할 내용
  }

  return (
    <div className="favorite-box">
      <h2 className="favorite-head">베스트 상품</h2>
      <ul className="favorite-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="favorite-list">
              {product.images.length > 0 && (
                <img
                  className="product-image"
                  src={product.images[0]}
                  alt={product.name}
                />
              )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}원</p>
              <div className="favorite-count-box">
                <img
                  className="favorite-count-image"
                  src="/assets/Icon.png"
                  alt="좋아요 하트 기호"
                ></img>
                <p className="favorite-count">{product.favoriteCount}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default FavoriteItem;
