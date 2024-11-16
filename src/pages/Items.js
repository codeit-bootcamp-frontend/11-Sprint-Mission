import AllItems from "../components/AllItem";
import BestItem from "../components/BestItem";

function Items() {
  return (
    <div className="item-section-container">
      <BestItem />
      <AllItems />
    </div>
  );
}

export default Items;
