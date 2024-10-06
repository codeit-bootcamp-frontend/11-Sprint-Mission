import Searchbox from "./Searchbox";
import ItemSubmit from "./ItemSubmit";
import DropDownbtn from "./DropDownbtn";
import "./Alltem.css";
const Alltem = () => {
  return (
    <div>
      <div className="aitop">
        <h1>전체상품</h1>
        <div className="altop-flex">
          <Searchbox />
          <ItemSubmit />
          <DropDownbtn />
        </div>
      </div>
    </div>
  );
};
export default Alltem;
