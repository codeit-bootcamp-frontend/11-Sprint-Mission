import AllItems from "../../entities/items/ui/itemList/AllItems";
import BestItems from "../../entities/items/ui/itemList/BestItems";

const Items = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 ">
      <BestItems />
      <AllItems />
    </div>
  );
};

export default Items;
