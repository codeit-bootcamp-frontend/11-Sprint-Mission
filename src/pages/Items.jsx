import "./Items.scss";
import { useState } from "react";
import useProductsAll from "../hooks/useProductsAll";
import useProductsFavorite from "../hooks/useProductsFavorite";
import ProductsList from "../components/Items/ProductsList";
import PageNation from "../components/common/PageNation";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";
import DropDown from "../components/common/SelectMenu";
import HeadingTitleArea from "../components/common/HeadingTitleArea";

function Items() {
  const [order, setOrder] = useState("recent");
  const [search, setSearch] = useState("");
  const {
    items: allItems,
    isLoading: productIsLoading,
    fetchError: productFetchError,
    total,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useProductsAll({ order, search });
  const {
    items: favoriteItems,
    fetchError: favoriteFetchError,
    isLoading: favoriteIsLoading,
  } = useProductsFavorite();

  const handleSelect = (value) => setOrder(value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target["search"].value.trim();
    setSearch(searchValue);
  };

  const isEmpty =
    allItems.length === 0 && !productFetchError && !productIsLoading;

  return (
    <main className="page-items">
      <div className="container">
        <div className="product-area best">
          <HeadingTitleArea>
            <h2>베스트 상품</h2>
          </HeadingTitleArea>
          {favoriteIsLoading && <p>로딩 중 입니다...</p>}
          {favoriteFetchError?.message && (
            <span>{favoriteFetchError.message}</span>
          )}
          <ProductsList
            list={favoriteItems}
            imageSize={{
              pcSize: "large",
              tabletSize: "big-large",
              mobileSize: "big-large",
            }}
          />
        </div>
        <div className="product-area all">
          <HeadingTitleArea>
            <h2>전체 상품</h2>
            <SearchInput onSubmit={handleSearchSubmit} />
            <Button
              link={true}
              href="/addItem"
              className="addItem"
              styleType="square blue small_40">
              상품 등록하기
            </Button>
            <DropDown>
              <DropDown.Title>최신순</DropDown.Title>
              <DropDown.Option
                label="최신순"
                value="recent"
                onSelect={handleSelect}
              />
              <DropDown.Option
                label="좋아요순"
                value="favorite"
                onSelect={handleSelect}
              />
            </DropDown>
          </HeadingTitleArea>
          {productIsLoading && <p>로딩 중 입니다...</p>}
          {productFetchError?.message && (
            <span>{productFetchError.message}</span>
          )}
          <ProductsList
            list={allItems}
            imageSize={{
              pcSize: "middle",
              tabletSize: "middle",
              mobileSize: "big-small",
            }}
          />
          {isEmpty && (
            <div className="error-search">
              <p className="error-search-message">
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
