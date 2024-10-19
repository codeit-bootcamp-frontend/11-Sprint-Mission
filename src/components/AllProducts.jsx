import ProductCard from "./ProductCard";
import "./AllProducts.css";
import SearchIcon from "../images/ic_search.svg";
import { Link } from "react-router-dom";

const AllProducts = ({ products }) => {
  return (
    <div className="allproducts-container">
      <div className="allproducts-header">
        <h2 className="allproducts-title">전체 상품</h2>
        <div className="header-right">
          <div className="search-container">
            <img src={SearchIcon} alt="검색 아이콘" className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <Link to={"/additems"} className="additem-btn">
            상품 등록하기
          </Link>
          <select>
            <option></option>
          </select>
        </div>
      </div>
      <div className="allcards-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
