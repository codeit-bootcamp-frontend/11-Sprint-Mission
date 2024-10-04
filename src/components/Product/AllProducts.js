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
  const pageSize = 10;

  const handleLoad = async () => {
    const queryParams = {
      pageSize,
      keyword: search,
      orderBy: order,
      page: currentPage,
    };
    let result;
    try {
      setLoadingError(null);
      result = await getProductsList(queryParams);
    } catch (error) {
      setLoadingError(error);
    }
    const { list, totalCount } = result;
    setItems(list);
    setTotal(totalCount);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleBestClick = () => setOrder("favorite");
  const handleNewestClick = () => setOrder("recent");

  useEffect(() => {
    handleLoad();
  }, [search, order, currentPage]);

  return (
    <div>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <ProductsList
        list={items}
        imageSize='middle'
        countSize='small'
        productManagement={true}
        onSubmit={handleSearchSubmit}
        onBest={handleBestClick}
        onNewest={handleNewestClick}
      >
        전체 상품
      </ProductsList>
      <PageNation total={total} pageSize={pageSize} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default AllProducts;
