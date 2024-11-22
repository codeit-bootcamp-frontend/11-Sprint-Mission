import React, { useEffect, useState } from "react";
import { fetchProductDetail, Product } from "../../api/itemsApi";
import { useParams, useNavigate } from "react-router-dom";
import ItemInfo from "./components/ItemInfo";
import CommentForm from "./components/ItemCommentForm";
import CommentList from "./components/ItemCommentList";
import icBack from "../../images/icons/ic_back.svg";
import "./ItemDetailPage.css";

function ItemDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) {
      console.error("Invalid product ID");
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetail(Number(productId));
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleToList = () => {
    navigate("/items");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <ItemInfo product={product} />
      <CommentForm productId={Number(productId)} />
      <CommentList />
      <div className="toListButtonContainer">
        <button onClick={handleToList} className="toListButton">
          목록으로 돌아가기
          <img src={icBack} alt="화살표" />
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
