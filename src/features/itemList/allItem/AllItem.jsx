import { Link } from "react-router-dom";
import heart from "../../../shared/assets/heart.svg";
const AllItem = ({ item }) => {
  return (
    <div key={item.id}>
      <div className="mb-1">
        <Link to={`/products/${item.id}`} className="w-full">
          <img
            className="w-full h-48 rounded-lg"
            src={item.images[0]}
            alt="프로덕트 이미지"
          ></img>
        </Link>
      </div>
      <h3>{item.name}</h3>
      <div className="text-lg font-bold">{item.price.toLocaleString()}원</div>
      <div className="flex">
        <img src={heart}></img>
        {item.favoriteCount}
      </div>
    </div>
  );
};

export default AllItem;
