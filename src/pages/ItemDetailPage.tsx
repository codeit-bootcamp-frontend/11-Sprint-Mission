import ProductComment from '../components/ProductComment';
import ProductDetail from '../components/ProductDetail';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ItemDetailPage.css';

type Params = {
  productId: string | undefined;
};

function ItemDetailPage() {
  const { productId } = useParams<Params>();
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/items');
  };

  if (!productId) {
    return <div>"상품을 찾을 수 없습니다."</div>;
  }

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
