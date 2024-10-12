import { useEffect, useState } from "react";
import { getItems } from "../api.js";
import "../css/AllProducts.css";
import searchIcon from "../img/icon/ic_search.png";
import Product from "./Product.js";
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updatePageSize = () => {
    if (window.innerWidth > 1152) {
      setPageSize(10);
    } else if (window.innerWidth > 768) {
      setPageSize(6);
    } else {
      setPageSize(4);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      updatePageSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoad = async (options) => {
    let result;
    try {
      result = await getItems(options);
    } catch (error) {
      console.log(error);
    }
    setProducts(result.list);
  };

  const handleKeyworSubmit = (e) => {
    e.preventDefault();
    setKeyword(e.target["keyword"].value);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  useEffect(() => {
    handleLoad({ pageSize, orderBy, keyword });
  }, [pageSize, orderBy, keyword]);

  return (
    <div className="allProducts">
      <div className="allTitle">
        <p>전체 상품</p>
        <div className="allBars">
          <div className="inputContainer">
            <img className="searchIcon" src={searchIcon} alt="검색창 찾기" />
            <form onSubmit={handleKeyworSubmit}>
              <input
                name="keyword"
                className="searchBar"
                placeholder="검색할 상품을 입력해주세요"
              />
            </form>
          </div>
          <Link to="/additem">
            <button className="registerItem">상품 등록하기</button>
          </Link>
          <select className="selectSort" onChange={handleOrderByChange}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요 순</option>
          </select>
        </div>
      </div>
      <div className="indivProducts">
        {products && products.length > 0 ? (
          products.map(({ id, images, name, price, favoriteCount }) => (
            <Product
              key={id}
              image={images[0]}
              name={name}
              price={price}
              favoriteCount={favoriteCount}
            />
          ))
        ) : (
          <p>상품을 찾는 중입니다..</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
