import React from "react";
import Pagenation from "../Pagenation";
import SearchBox from "../SearchBox";
import heart from "../../images/icon/heart.svg";
import "./../css/ProductList.css";
import { Link } from "react-router-dom";

const Product = ({ productLists }) => {
  return (
    <>
      {productLists?.map((data) => (
        <div key={data.id} className="product-card">
          <Link to={`${data.id}`}>
            <img src={data.images[0]} className="card-img" alt="대표사진"></img>
            <div className="product-card__cardinfo">
              <div className="name">{data.name}</div>
              <div className="price">{data.price}</div>
              <div className="count">
                <img className="image-logo" src={heart} alt="즐겨찾기" />
                {data.favoriteCount}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

const ProductList = ({
  sortedItems,
  page,
  onChangeSort,
  onClickPage,
  gridRows,
  label,
  isLoading,
  ispageNation, //페이지네이션 (true 일시 제공)
  issearch, //검색버튼 (true 일시 제공)
}) => {
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
          <Product productLists={sortedItems} />
        </div>
        {/* )} */}
      </section>
      {ispageNation && (
        <div className="all-product__bottom">
          <Pagenation onPage={page} onClickPage={onClickPage} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
