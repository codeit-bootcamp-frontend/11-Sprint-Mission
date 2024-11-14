import ProductInquiry from "../components/ProductInquiry";
import ProductDetail from "../components/ProcudtDetail";
import { useParams } from "react-router-dom";

function ItemDetail() {
  const { productId } = useParams();

  return (
    <>
      <ProductDetail productId={productId} />
      <ProductInquiry productId={productId} />
    </>
  );
}

export default ItemDetail;
