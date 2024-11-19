import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { getList } from "../api/api";
import BestProducts from "../components/BestProducts";
import EntireProducts from "../components/EntireProducts";
import PageButton from "../components/PageButton";
import "../utils/Style.css";
import "./ItemsPage.css";
import magnifier from "../assets/icons/ic_magnifier.svg";

interface Item {
  id: string;
  recent: number;
  favorite: number;
}

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [orderBy, setOrderBy] = useState<"recent" | "favorite">("recent");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const sortedItems = [...items].sort((a, b) => b[orderBy] - a[orderBy]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setOrderBy(e.target.value as "recent" | "favorite");

  const handleLoad = async (options: { page: number; pageSize: number; orderBy: "recent" | "favorite" }) => {
    try {
      setIsLoading(true);
      setLoadingError(null);
      const result = await getList(options);
      const { list } = result;
      if (options.page === 1) {
        setItems(list);
      } else {
        setItems((prevItems) => [...prevItems, ...list]);
      }
      setPage(options.page);
    } catch (error) {
      setLoadingError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad({ page: 1, pageSize: 10, orderBy });
  }, [orderBy]);

  const handleRetry = () => {
    handleLoad({ page, pageSize: 10, orderBy });
  };

  return (
    <>
      <Nav />
      <main className="items-body">
        <section className="best-section">
          <h2>베스트 상품</h2>
          <BestProducts items={sortedItems} />
        </section>
        <section className="entire-section">
          <div className="section-to-us">
            <h2>전체 상품</h2>
            <aside>
              <div className="for-products">
                <div className="input-container">
                  <img src={magnifier} className="magnifier" alt="상품찾기" />
                  <input placeholder="검색할 상품을 입력해주세요" className="input-search" />
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
          {loadingError ? (
            <div className="error-container">
              <p className="error-message">상품을 불러오는 중 오류가 발생했습니다.</p>
              <button onClick={handleRetry} className="retry-button">
                다시 시도하기
              </button>
            </div>
          ) : (
            <EntireProducts items={sortedItems} />
          )}
        </section>
      </main>
      <footer>
        <div className="pagination">
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <PageButton
              key={pageNum}
              type="button"
              disabled={isLoading || page === pageNum}
              value={pageNum}
              clickBtn={() => handleLoad({ page: pageNum, pageSize: 10, orderBy })}
            />
          ))}
        </div>
        {isLoading && <p className="loading-message">로딩 중...</p>}
      </footer>
    </>
  );
}

export default ItemsPage;