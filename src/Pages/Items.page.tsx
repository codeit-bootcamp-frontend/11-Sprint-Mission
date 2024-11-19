import AllProducts from '../components/AllProducts';
import BestProducts from '../components/BestProducts';
import Meta from '../components/Meta';
//
import './Items.css';

interface Props {
  title: string;
  desc: string;
}

export default function Items({ title, desc }: Props) {
  return (
    <>
      <Meta title={title} description={desc} url={window.location.href} />

      <BestProducts />
      <AllProducts />
    </>
  );
}
