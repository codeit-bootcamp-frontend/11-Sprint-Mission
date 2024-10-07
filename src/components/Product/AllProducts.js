import useProductsAll from "../../hooks/useProductsAll";
import ProductsList from "../../layout/ProductsList";
import PageNation from "../PageNation";

const AllProducts = () => {
  const {
    items,
    total,
    currentPage,
    setCurrentPage,
    isLoading,
    loadingError,
    pageSize,
    handleSearchSubmit,
    handleBestClick,
    handleNewestClick,
    searchError,
  } = useProductsAll();

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
