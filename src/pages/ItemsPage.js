import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { getList } from "../api/ItemsPageApi";
import BestProducts from "../components/BestProducts";
import EntireProducts from "../components/EntireProducts";
import PageButton from "../components/PageButton";
import "../utils/Style.css";
import "./ItemsPage.css";
import "../components/SearchBar.css";
import magnifier from "../assets/icons/ic_magnifier.svg";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const sortedItems = items.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleChange = (e) => setOrderBy(e.target.value);

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getList(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { list } = result;
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
      <main className="items-body">
        <section className="best-section">
          <h2>베스트 상품</h2>
          <BestProducts items={sortedItems}></BestProducts>
        </section>
        <section className="entire-section">
          <div className="section-to-us">
            <h2>전체 상품</h2>
            <aside>
              <div className="for-products">
                <div className="input-container">
                  <img src={magnifier} className="magnifier" alt="상품찾기" />
                  <input
                    placeholder="검색할 상품을 입력해주세요"
                    className="input-search"
                  />
                </div>
                <Link to="/additem">
                  <button className="medium-button">
                    <p className="medium-btn-text">상품 등록하기</p>
                  </button>
                </Link>
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
          <PageButton
            type="button"
            disabled={isLoading}
            clickBtn={handleLoadMore}
          >
            &lt;
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            value={1}
            clickBtn={handleLoadMore}
          >
            1
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            value={2}
            clickBtn={handleLoadMore}
          >
            2
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            value={3}
            clickBtn={handleLoadMore}
          >
            3
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            value={4}
            clickBtn={handleLoadMore}
          >
            4
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            value={5}
            clickBtn={handleLoadMore}
          >
            5
          </PageButton>
          <PageButton
            type="button"
            disabled={isLoading}
            clickBtn={handleLoadMore}
          >
            &gt;
          </PageButton>
          {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
      </footer>
    </>
  );
}

export default ItemsPage;
