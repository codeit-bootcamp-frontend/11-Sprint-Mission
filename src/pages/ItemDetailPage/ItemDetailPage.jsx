import React, { useEffect, useState } from "react";
import { fetchProductDetail } from "../../api/itemsApi";
import { useParams } from "react-router-dom";
import ItemInfo from "./components/ItemInfo";

function ItemDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetail(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <ItemInfo product={product} />
    </div>
  );
}

export default ItemDetail;
