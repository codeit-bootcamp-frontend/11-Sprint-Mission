import AllItems from "../../features/itemList/allItem/AllItems";
import BestItems from "../../features/itemList/bestItem/BestItems";

const Items = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col mt-5 ">
      <BestItems />
      <AllItems />
    </div>
  );
};

export default Items;
