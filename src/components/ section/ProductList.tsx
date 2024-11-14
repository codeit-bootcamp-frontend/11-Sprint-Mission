import React from "react";
import Pagenation from "../common/Pagenation";
import SearchBox from "../common/SearchBox";
import heart from "../../images/icon/heart.svg";
import "./../css/ProductList.css";
import { Link } from "react-router-dom";
import {
  ProductBestListProps,
  ProductListProps,
  ProductProps,
} from "../../types/MarketPage";

const Product = ({ productLists }: ProductProps) => {
  const { id, images, name, price, favoriteCount } = productLists;

  return (
    <>
      <div key={id} className="product-card">
        <Link to={`${id}`}>
          <img src={images[0]} className="card-img" alt="대표사진"></img>
          <div className="product-card__cardinfo">
            <div className="name">{name}</div>
            <div className="price">{price}</div>
            <div className="count">
              <img
                className="product-card_image-logo"
                src={heart}
                alt="즐겨찾기"
              />
              {favoriteCount}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

const ProductList = ({
  sortedItems,
  onChangeSort,
  onClickPage,
  gridRows,
  label,
  isLoading,
  ispageNation, //페이지네이션 (true 일시 제공)
  issearch, //검색버튼 (true 일시 제공)
}: ProductListProps) => {
  return (
    <div className="all-product">
      <section>
        <div className={issearch ? "topbar between" : "topbar"}>
          <div className="topbar-label">{label}</div>
          {issearch && <SearchBox onChangeSort={onChangeSort} />}
        </div>
        {/* {isLoading ? (
          <div className="loading">Loading...</div> // 로딩 표시 (이주석을 풀면 전체페이지가 렌더링되네요.. 로딩처리를 어디에하면좋을가요?)
        ) : ( */}
        <div className={`product-cardlist__${gridRows}row`}>
          <>
            {sortedItems.map((data: ProductBestListProps) => (
              <Product productLists={data} />
            ))}
          </>
        </div>
        {/* )} */}
      </section>
      {ispageNation && (
        <div className="all-product__bottom">
          <Pagenation onClickPage={(e, page) => onClickPage} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
