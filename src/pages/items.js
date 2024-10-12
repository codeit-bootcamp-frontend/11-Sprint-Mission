import BestProduct from "../components/BestProduct";
import AllProducts from "../components/AllProducts";
import "./items.css";

function Items() {
  return (
    <div className="itemPage">
      <BestProduct />
      <AllProducts />
    </div>
  );
}

export default Items;
