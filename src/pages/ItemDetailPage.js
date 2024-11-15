import ProductComment from "../components/ProductComment";
import ProductDetail from "../components/ProductDetail";
import { useParams } from "react-router-dom";

function ItemDetailPage() {
  const { productId } = useParams();

  return (
    <>
      <ProductDetail productId={productId} />
      <ProductComment productId={productId} />
    </>
  );
}

export default ItemDetailPage;
