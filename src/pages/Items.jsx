import ProductManagement from "../components/Product/ProductManagement";
import useProductsAll from "../hooks/useProductsAll";
import ProductsList from "../layout/ProductsList";
import PageNation from "../components/PageNation";
import "../styles/page-items/items.css";
import useProductsFavorite from "../hooks/useProductsFavorite";

function Items() {
  const {
    items: allItems,
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

  const { items: favoriteItems } = useProductsFavorite();

  return (
    <main className='page-items'>
      <div className='container'>
        <div className='product-area best'>
          <div className='product-category'>
            <h2 className='product-category-name'>베스트 상품</h2>
          </div>
          {isLoading && <p>로딩 중 입니다...</p>}
          <ProductsList list={favoriteItems} imageSize='large' />
        </div>
        <div className='product-area all'>
          <div className='product-category'>
            <h2 className='product-category-name'>전체 상품</h2>
            <ProductManagement
              onSubmit={handleSearchSubmit}
              onBest={handleBestClick}
              onNewest={handleNewestClick}
            />
          </div>
          {isLoading && <p>로딩 중 입니다...</p>}
          <ProductsList list={allItems} imageSize='middle' />
          {allItems.length === 0 &&
            !searchError &&
            !loadingError &&
            !isLoading && (
              <div className='error-search'>
                <p className='error-search-message'>
                  검색어와 일치하는 상품이 없습니다.
                </p>
              </div>
            )}
          <PageNation
            total={total}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </main>
  );
}

export default Items;
