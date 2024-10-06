import heart from "../../shared/assets/heart.svg";
const AllItem = ({ product }) => {
  return (
    <div key={product.id}>
      <div className="mb-1">
        <img
          className="w-full h-48 rounded-lg"
          src={product.images[0]}
          alt="프로덕트 이미지"
        ></img>
      </div>
      <h3>{product.name}</h3>
      <div className="text-lg font-bold">
        {product.price.toLocaleString()}원
      </div>
      <div className="flex">
        <img src={heart}></img>
        {product.favoriteCount}
      </div>
    </div>
  );
};

export default AllItem;
