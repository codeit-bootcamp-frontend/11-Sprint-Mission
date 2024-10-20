import { TITLE } from '../info';
import AllProducts from '../Components/AllProducts';
import BestProducts from '../Components/BestProducts';
import './Items.css';
import Meta from '../Components/Meta';

export default function Items() {
  return (
    <>
      <Meta
        title={`중고마켓 | ${TITLE}`}
        description="판다마켓 중고마켓 상품 목록 입니다."
        url={window.location.href}
      />

      <BestProducts />
      <AllProducts />
    </>
  );
}
