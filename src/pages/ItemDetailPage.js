import { useParams } from "react-router-dom";

function ItemDetailPage() {
  const { id } = useParams();
  return <>{id}</>;
}

export default ItemDetailPage;
