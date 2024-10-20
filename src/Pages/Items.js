import { Helmet } from 'react-helmet';
import { TITLE } from '../info';
import AllProducts from '../Components/AllProducts';
import BestProducts from '../Components/BestProducts';
import './Items.css';

export default function Items() {
  return (
    <>
      <Helmet>
        <title>중고마켓 | {TITLE}</title>
      </Helmet>

      <BestProducts />
      <AllProducts />
    </>
  );
}
