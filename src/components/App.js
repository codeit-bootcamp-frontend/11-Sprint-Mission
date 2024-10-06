import { useEffect, useState } from "react";
import { getList } from "../api";
import Nav from "./Nav";
import BestProducts from "./BestProducts";
import EntireProducts from "./EntireProducts";
import Button from "./Button";
import "./Style.css";
import "./App.css";
import "./SearchBar.css";
import magnifier from "../images/Vector.svg";

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
        <main className="body">
          <section className="best-section">
            <h2>베스트 상품</h2>
            <BestProducts items={sortedItems}></BestProducts>
          </section>
          <section className="entire-section">
            <div className="section-to-us">
              <h2>전체 상품</h2>
              <aside>
                <div className="for-products">
                  <img src={magnifier} className="magnifier" alt="상품찾기" />
                  <input
                    placeholder="검색할 상품을 입력해주세요"
                    className="input-search"
                  ></input>
                  <a href="./AddItem" className="small-button">
                    <p>상품 등록하기</p>
                  </a>
                </div>
                <label htmlFor="order"></label>
                <select id="order" onChange={handleClick} className="drop-down">
                  <option value="recent" className="drop-down">
                    최신순
                  </option>
                  <option value="favoriteCount" className="drop-down">
                    좋아요순
                  </option>
                </select>
              </aside>
            </div>
            <EntireProducts items={sortedItems}></EntireProducts>
          </section>
        </main>
      </body>
      <footer>
        <div className="pagination">
          <Button type="button" clickBtn={handleLoadMore}>
            &lt;
          </Button>
          <Button type="button" value={1} clickBtn={handleLoadMore}>
            1
          </Button>
          <Button type="button" value={2} clickBtn={handleLoadMore}>
            2
          </Button>
          <Button type="button" value={3} clickBtn={handleLoadMore}>
            3
          </Button>
          <Button type="button" value={4} clickBtn={handleLoadMore}>
            4
          </Button>
          <Button type="button" value={5} clickBtn={handleLoadMore}>
            5
          </Button>
          <Button type="button" clickBtn={handleLoadMore}>
            &gt;
          </Button>
        </div>
      </footer>
    </>
  );
}

export default App;
