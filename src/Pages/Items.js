import AllProducts from '../Components/AllProducts';
import BestProducts from '../Components/BestProducts';
import Header from '../Components/Header';
import './Items.css';

export default function Items() {
  return (
    <>
      <Header />

      <main className="container">
        <BestProducts />
        <AllProducts />
      </main>
    </>
  );
}
