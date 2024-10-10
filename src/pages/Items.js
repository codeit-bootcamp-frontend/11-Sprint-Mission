import AllItems from "../components/AllItem";
import BestItem from "../components/BestItem";
import Nav from "../components/Nav";

function Items() {
  return (
    <div>
      <Nav />
      <div className="item-section-container">
        <BestItem />
        <AllItems />
      </div>
    </div>
  );
}

export default Items;
