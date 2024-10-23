import React from "react";
import { Link } from "react-router-dom";
// import SortIcon from "../images/ic_sort.svg";
import { ReactComponent as SearchIcon } from "../images/ic_search.svg";
import Dropdown from "./Dropdown";
// import "./AllProduct.css";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { getProducts } from "../api/api";

function AllProduct() {
  const [orderBy, setOrderBy] = useState("createdAt");
  const [itemList, setItemList] = useState([]);
  const pageSize = 4;

  const sortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  const handleSortSelection = (sortOption) => {
    setOrderBy(sortOption);
  };

  useEffect(() => {
    sortedData({ orderBy: "favorite", pageSize });
  }, []);

  return (
    <div className="allItemsContainer">
      <h1>판매 중인 상품</h1>
      <Link to="/additem">상품 등록하기</Link>

      <div>
        <div className="search">
          <SearchIcon />
          <input
            className="searchInput"
            placeholder="검색할 상품을 입력해 주세요"
          />
        </div>
        <Dropdown onSortSelection={handleSortSelection} />
      </div>

      <div>
        {itemList &&
          itemList?.map((item) => (
            <ItemCard item={item} key={`all-item-${item.id}`} />
          ))}
      </div>
    </div>
  );
}

export default AllProduct;
