import "./Items.scss";
import useProductsAll from "../hooks/useProductsAll";
import ProductsList from "../components/Items/ProductsList";
import PageNation from "../components/common/PageNation";
import useProductsFavorite from "../hooks/useProductsFavorite";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown";
import { useState } from "react";

function Items() {
  const [order, setOrder] = useState("recent");
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target["search"].value.trim();
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleBestClick = () => setOrder("favorite");
  const handleNewestClick = () => setOrder("recent");
  const {
    items: allItems,
    total,
    currentPage,
    setCurrentPage,
    isLoading,
    fetchError,
    pageSize,
  } = useProductsAll({ order, search });

  const { items: favoriteItems } = useProductsFavorite();

  const isEmpty = allItems.length === 0 && !fetchError && !isLoading;

  const options = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "favorite" },
  ];

  const handleSelect = (value) => {
    if (value === "recent") {
      handleNewestClick();
    } else if (value === "favorite") {
      handleBestClick();
    }
  };

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
            <SearchInput onSubmit={handleSearchSubmit} />
            <Button
              link={true}
              href='/addItem'
              className='addItem'
              styleType='square blue'
            >
              상품 등록하기
            </Button>
            <DropDown options={options} onSelect={handleSelect} />
          </div>
          {isLoading && <p>로딩 중 입니다...</p>}
          <ProductsList list={allItems} imageSize='middle' />
          {isEmpty && (
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
