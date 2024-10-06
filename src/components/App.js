import { useEffect, useState } from "react";
import { getList } from "../api";
import Nav from "./Nav";
import ProductsCategory from "./ProductsCategory";
import BestProducts from "./BestProducts";
import EntireProducts from "./EntireProducts";
import Button from "./Button";
import "./Style.css";
import "./SearchBar.css";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("recent");
  const [page, setPage] = useState(1);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const handleClick = (e) => setOrder(e.target.value);

  const handleLoad = async (options) => {
    const { list } = await getList(options);
    if (options.page === 1) {
      setItems(list);
    } else {
      setItems([...items, ...list]);
    }
    setPage(options.page + list.length);
  };

  const handleLoadMore = (e) => {
    const param = { page: e.target.value, pageSize: 10, orderBy: order };
    handleLoad(param);
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, orderBy: order });
  }, [order]);

  return (
    <>
      <Nav></Nav>
      <body>
        <section className="best-section">
          <ProductsCategory>베스트 상품</ProductsCategory>
          <div className="best-grid-container">
            <BestProducts items={sortedItems}></BestProducts>
          </div>
        </section>
        <section className="entire-section">
          <ProductsCategory>전체 상품</ProductsCategory>
          <aside>
            <input
              placeholder="검색할 상품을 입력해주세요"
              className="input-search"
            ></input>
            <a href="./AddItem" className="register">
              상품 등록하기
            </a>
            <label htmlFor="order"></label>
            <select id="order" onChange={handleClick}>
              <option value="recent">최신순</option>
              <option value="favoriteCount">좋아요순</option>
            </select>
          </aside>
          <div className="entire-grid-container">
            <EntireProducts items={sortedItems}></EntireProducts>
          </div>
        </section>
      </body>
      <footer>
        <Button value={1} clickBtn={handleLoadMore}>
          1
        </Button>
        <Button value={2} clickBtn={handleLoadMore}>
          2
        </Button>
        <Button value={3} clickBtn={handleLoadMore}>
          3
        </Button>
        <Button value={4} clickBtn={handleLoadMore}>
          4
        </Button>
        <Button value={4} clickBtn={handleLoadMore}>
          5
        </Button>
      </footer>
    </>
  );
}

export default App;
