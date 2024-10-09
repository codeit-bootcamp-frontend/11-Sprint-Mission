import BestProduct from "../components/items/BestProduct";
import AllProduct from "../components/items/AllProduct";
import { SubHeader } from "../layouts/Header";

const Items = () => {
  return (
    <>
      <SubHeader />
      <BestProduct />
      <AllProduct />
    </>
  );
};

export default Items;
