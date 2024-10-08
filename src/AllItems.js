import { useEffect, useState } from "react";
import { getItems } from "./api";
import "./css/AllItems.css";
import searchIcon from "./img/icon/ic_search.png";
import Item from "./Item.js";

function BestItem() {
  const [items, setItems] = useState([]);
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
    setItems(result.list);
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
    <div className="allItems">
      <div className="allTitle">
        <p>전체 상품</p>
        <div className="allBars">
          <div className="inputContainer">
            <img className="searchIcon" src={searchIcon} />
            <form onSubmit={handleKeyworSubmit}>
              <input
                name="keyword"
                className="searchBar"
                placeholder="검색할 상품을 입력해주세요"
              />
            </form>
          </div>
          <button className="registerItem">상품 등록하기</button>
          <select className="selectSort" onChange={handleOrderByChange}>
            <option value="recent">최신순</option>
            <option value="favorite">좋아요 순</option>
          </select>
        </div>
      </div>
      <div className="indivItems">
        {items && items.length > 0 ? (
          items.map(({ id, images, name, price, favoriteCount }) => (
            <Item
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

export default BestItem;
