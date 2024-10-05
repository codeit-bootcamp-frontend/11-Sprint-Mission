import AllProducts from '../Components/AllProducts';
import BestProducts from '../Components/BestProducts';
import Header from '../Components/Header';

export default function Items() {
  return (
    <>
      <Header />

      <div className="container">
        <BestProducts />
      </div>
    </>
  );
}
