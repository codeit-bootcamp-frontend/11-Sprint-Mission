import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ReactComponent as Searchcon } from "../../../images/icons/searchicon.svg";
import { ReactComponent as SortIcon } from "../../../images/icons/arrowdown.svg";
import { fetchProducts } from "../../../api/itemsApi";
import DropDown from "./DropDown";

const getUserWidth = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1200) {
    return 6;
  } else {
    return 10;
  }
};

function AllProducts() {
  const [orderBy, setOrderBy] = useState("recent");
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getUserWidth());
  const [isDropDown, setIsDropDown] = useState(false);

  const fetchData = async ({ orderBy, pageSize }) => {
    try {
      const products = await fetchProducts({ orderBy, pageSize });
      setItemList(products.list);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSortSelection = (option) => {
    setOrderBy(option);
    setIsDropDown(false);
  };

  useEffect(() => {
    const handleUserWidth = () => {
      setPageSize(getUserWidth());
    };

    window.addEventListener("resize", handleUserWidth);

    return () => {
      window.removeEventListener("resize", handleUserWidth);
    };
  }, []);

  useEffect(() => {
    fetchData({ orderBy, pageSize });
  }, [orderBy, pageSize]);

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };
  return (
    <div className="productContainer">
      <div className="allProductsHeader">
        <h1 className="sectionTitle">전체 상품</h1>
        <div className="rightHeader">
          <div className="searchBar">
            <Searchcon />
            <input
              className="searchInput"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <Link to="/additem" className="addItem">
            상품 등록하기
          </Link>
          <div className="sortWrapper">
            <button className="sortButton" onClick={toggleDropDown}>
              <SortIcon />
            </button>
            {isDropDown && <DropDown onSortSelection={handleSortSelection} />}
          </div>
        </div>
      </div>
      <div className="allProductCard">
        {itemList?.map((item) => (
          <ProductCard item={item} key={`best-product-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
