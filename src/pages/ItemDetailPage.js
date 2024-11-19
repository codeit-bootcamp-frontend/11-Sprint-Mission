import ProductComment from "../components/ProductComment";
import ProductDetail from "../components/ProductDetail";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ItemDetailPage.css";

function ItemDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate("/items");
  };

  return (
    <>
      <ProductDetail productId={productId} />
      <ProductComment productId={productId} />
      <div className="button-container">
        <button className="back-to-list" onClick={handleBackToList}>
          목록으로 돌아가기 ↩
        </button>
      </div>
    </>
  );
}

export default ItemDetailPage;
