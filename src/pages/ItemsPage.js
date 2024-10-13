import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { getList } from "../api";
import BestProducts from "../components/BestProducts";
import EntireProducts from "../components/EntireProducts";
import Button from "../components/Button";
import "../utils/Style.css";
import "./ItemsPage.css";
import "../components/SearchBar.css";
import magnifier from "../assets/Vector.svg";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);

  const sortedItems = items.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleChange = (e) => setOrderBy(e.target.value);

  const handleLoad = async (options) => {
    const { list } = await getList(options);
    if (options.page === 0) {
      setItems(list);
    } else {
      setItems([...items, ...list]);
    }
    setPage(options.page + list.length);
  };

  const handleLoadMore = () => {
    handleLoad({ page, pageSize: 10, orderBy });
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, orderBy });
  }, [orderBy]);

  return (
    <>
      <Nav />
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

                <button className="small-button">
                  <Link to="/additem">
                    <p className="small-btn-text">상품 등록하기</p>
                  </Link>
                </button>
              </div>
              <label htmlFor="order"></label>
              <select id="order" onChange={handleChange} className="drop-down">
                <option value="recent" className="drop-down">
                  최신순
                </option>
                <option value="favorite" className="drop-down">
                  좋아요순
                </option>
              </select>
            </aside>
          </div>
          <EntireProducts items={sortedItems}></EntireProducts>
        </section>
      </main>
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

export default ItemsPage;
