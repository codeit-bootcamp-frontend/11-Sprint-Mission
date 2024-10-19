import React from "react";
import { useEffect, useState } from "react";
import { getProductList } from "../api/api.js";
import "./HomePage.css";
import ProductList from "../components/ section/ProductList.js";

const HomePage = () => {
  const [productBestList, setProductBestList] = useState();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async (options) => {
    let result;

    try {
      setIsLoading(true);
      result = await getProductList(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { list } = result;

    setProductList(list);
  };

  const handleBestLoadData = async () => {
    let bestResult;
    const bestParams = {
      orderBy: "favorite",
      pageSize: 4,
    };

    try {
      setLoadingError(null);
      setIsLoading(true);
      bestResult = await getProductList(bestParams);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    setProductBestList(bestResult.list);
  };

  const handleChangeSort = async (e) => {
    const category = e.target.value;
    setOrderBy(category === "recent" ? "recent" : "favorite");
  };

  const sortedItems = productList.sort((a, b) => b[orderBy] - a[orderBy]);

  // 아래영역
  useEffect(() => {
    handleLoadData({
      orderBy,
      page,
    });
  }, [orderBy, page]);

  // 윗영역
  useEffect(() => {
    handleBestLoadData();
  }, []);

  return (
    <>
      <div className="main-content">
        <ProductList
          label={"베스트상품"}
          gridRows={4}
          issearch={false}
          ispageNation={false}
          sortedItems={productBestList}
          onChangeSort={handleChangeSort}
        />
        <ProductList
          label={"전체상품"}
          gridRows={5}
          issearch={true}
          ispageNation={true}
          loadingError={loadingError}
          isLoading={isLoading}
          sortedItems={sortedItems}
          onChangeSort={handleChangeSort}
          onClickPage={(page) => setPage(page)}
        />
      </div>
    </>
  );
};

export default HomePage;
