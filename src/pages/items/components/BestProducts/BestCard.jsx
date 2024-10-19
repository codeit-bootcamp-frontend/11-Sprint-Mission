import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../../../api";
import heartIcon from "../../../../assets/icons/heart.svg";

function BestCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const productList = await fetchProducts();
        setProducts(productList);
      } catch (error) {
        console.error("제품을 불러오는데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.images[0]}
            className="rounded-2xl w-[343px] h-[343px]"
            alt={product.name}
          />
          <div className="flex flex-col gap-2">
            <p className="text-[#1F2937] font-medium text-sm">{product.name}</p>
            <p className="text-[#1F2937] font-bold text-base">
              {product.price}원
            </p>
            <div className="flex items-center gap-1">
              <img src={heartIcon} alt="찜버튼 이미지" />
              <p className="text-[#4B5563] text-xs font-medium">
                {product.favoriteCount} 찜
              </p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default BestCard;
