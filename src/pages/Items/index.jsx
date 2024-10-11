import AllItems from "../../features/allItem/AllItems";
import BestItems from "../../features/bestItem/BestItems";

const Items = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center flex-col mt-5 ">
        <BestItems />
        <AllItems />
      </div>
    </div>
  );
};

export default Items;
