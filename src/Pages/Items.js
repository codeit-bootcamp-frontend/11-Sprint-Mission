import AllProducts from '../Components/AllProducts';
import BestProducts from '../Components/BestProducts';
import Meta from '../Components/Meta';
//
import './Items.css';

export default function Items({ title, desc }) {
  return (
    <>
      <Meta title={title} description={desc} url={window.location.href} />

      <BestProducts />
      <AllProducts />
    </>
  );
}
