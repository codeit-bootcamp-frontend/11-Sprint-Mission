import "./ItemSubmit.css";
import { Link } from "react-router-dom";
const ItemSubmit = () => {
  return (
    <>
      <Link to="/Additem" className="submitbtn">
        <span>상품 등록하기</span>
      </Link>
    </>
  );
};
export default ItemSubmit;
