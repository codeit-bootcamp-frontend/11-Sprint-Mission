import React from "react";
import Cardlist from "../components/Cardlist";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductList } from "../api/api.js";
import "./HomePage.css";
import Pagenation from "../components/Pagenation.js";

const HomePage = () => {
  const [productBestList, setProductBestList] = useState();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(null);
  const [orderBy, setOrderBy] = useState("recent");
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async (options) => {
    const bestParams = {
      orderBy: "favorite",
      pageSize: 4,
    };

    let result, bestResult;

    try {
      setLoadingError(null);
      setIsLoading(true);
      result = await getProductList(options);
      bestResult = await getProductList(bestParams);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { list, totalCount } = result;

    setProductList(list);
    setProductBestList(bestResult.list);
    setTotalCount(totalCount);
  };

  const onChangeSort = async (e) => {
    const category = e.target.value;
    category === "recent" ? setOrderBy("recent") : setOrderBy("favorite");
  };

  const sortedItems = productList.sort((a, b) => b[orderBy] - a[orderBy]);

  const handleClickPage = (e) => {
    const pageNo = e.target.value;
    setPage(pageNo);
  };

  // 아래영역
  useEffect(() => {
    handleLoadData({
      orderBy,
      page,
    });
  }, [orderBy, page]);

  // 윗영역
  useEffect(() => {}, []);

  return (
    <div className="main-content">
      <section>
        <div className="all-product">
          <div className="topbar">
            <div className="topbar-label">베스트 상품</div>
          </div>
          <div className="product-cardlist">
            {isLoading ? (
              "로딩중..."
            ) : (
              <Cardlist productLists={productBestList} />
            )}
            {loadingError && <p>{loadingError.message}</p>}
          </div>
        </div>
      </section>
      <section>
        <div className="all-product">
          <div className="topbar between">
            <div className="topbar-label">전체 상품</div>
            <div>
              <div className="search-area">
                <div className="search-box">
                  <Link to="" className="searchGlass"></Link>
                  <input
                    className="search-input"
                    placeholder="검색할 상품을 입력해주세요"
                  ></input>
                </div>
                <Link to="/additem" className="btn btn-primary">
                  상품 등록하기
                </Link>
                <select name="최신순" onChange={onChangeSort}>
                  최신순
                  <option value="recent">최신순</option>
                  <option value="favorite">좋아요순</option>
                </select>
              </div>
            </div>
          </div>
          <div className="all-product">
            <div className="product-cardlist fiveRow">
              {isLoading ? (
                "로딩중..."
              ) : (
                <Cardlist productLists={sortedItems} />
              )}
              {loadingError && <p>{loadingError.message}</p>}
            </div>
          </div>
        </div>
      </section>
      <Pagenation
        totalCount={totalCount}
        onPage={page}
        onClickPage={handleClickPage}
      />
    </div>
  );
};

export default HomePage;
