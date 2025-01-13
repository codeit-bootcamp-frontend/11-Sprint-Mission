import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/api";
import "./FavoriteItem.css";
import heart from "../../assets/image/Icon.png";

interface Product {
  createdAt: Date;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

const FavoriteItem = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(
    getPageSize(window.innerWidth)
  );

  function getPageSize(width: number): number {
    // 윈도우 크기에 따라 pageSize 계산하는 함수
    if (width >= 1200) {
      return 4;
    } else if (width >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    // 윈도우 크기 변경 시 pageSize를 업데이트
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProducts({
          page: String(1),
          pageSize: String(pageSize),
          orderBy: "favorite",
          keyword: "",
        });
        setProducts(result.list);
      } catch (err) {
        setError((err as Error).message);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pageSize]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="favorite-box">
      <h2 className="favorite-head">베스트 상품</h2>
      <ul className="favorite-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <Link to={`${product.id}`} className="detail-link">
              <li key={product.id} className="favorite-list">
                {product.images.length > 0 && (
                  <div className="product-image-box">
                    <img
                      className="product-image"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                )}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}원</p>
                <div className="favorite-count-box">
                  <img
                    className="favorite-count-image"
                    src={heart}
                    alt="좋아요 하트 기호"
                  ></img>
                  <p className="favorite-count">{product.favoriteCount}</p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default FavoriteItem;
