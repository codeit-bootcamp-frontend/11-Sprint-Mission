import BestProduct from "../BestProduct";
import AllProducts from "../AllProducts";
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
