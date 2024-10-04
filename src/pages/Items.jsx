import AllProducts from "../components/Product/AllProducts";
import BestProducts from "../components/Product/BestProducts";
import "../styles/page-items/items.css";

const Items = () => {
  return (
    <main className='page-items'>
      <div className='container'>
        <BestProducts />
        <AllProducts />
      </div>
    </main>
  );
};

export default Items;
