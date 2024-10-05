import { useEffect, useState } from "react";
import { getProductsList } from "../../services/panda-market-api";
import ProductsList from "../../layout/ProductsList";
import PageNation from "../PageNation";

const AllProducts = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("recent");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingError, setLoadingError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setPageSize(4);
      } else if (window.matchMedia("(max-width: 1199px)").matches) {
        setPageSize(6);
      } else {
        setPageSize(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoad = async () => {
    const queryParams = {
      pageSize,
      keyword: search,
      orderBy: order,
      page: currentPage,
    };
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      setSearchError(null);
      result = await getProductsList(queryParams);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { list, totalCount } = result;
    setItems(list);
    setTotal(totalCount);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target["search"].value.trim();
    if (items.length === 0) {
      setSearchError({ search });
    }
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleBestClick = () => setOrder("favorite");
  const handleNewestClick = () => setOrder("recent");

  useEffect(() => {
    handleLoad();
  }, [search, order, currentPage, pageSize]);

  return (
    <>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <ProductsList
        list={items}
        imageSize='middle'
        countSize='small'
        productManagement={true}
        onSubmit={handleSearchSubmit}
        onBest={handleBestClick}
        onNewest={handleNewestClick}
        isLoading={isLoading}
        className='all'
      >
        전체 상품
      </ProductsList>
      {items.length === 0 && !searchError && !loadingError && !isLoading && (
        <div className='error-search'>
          <p className='error-search-message'>검색어와 일치하는 상품이 없습니다.</p>
        </div>
      )}

      <PageNation total={total} pageSize={pageSize} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </>
  );
};

export default AllProducts;
