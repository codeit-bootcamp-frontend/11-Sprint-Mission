import "./ItemsList.css";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getItems } from "../util/api";

import Search from "./Input/Search";
import Btn from "./Button/Btn";
import Dropdown from "./Button/Dropdown";
import ItemCard from "../components/Card/ItemCard";
import Pagination from "./Button/Pagination";

import useWindowWidth from "../hooks/useWindowWidth";

function ItemsList() {
  const nav = useNavigate();
  const [orderBy, setOrderBy] = useState("recent");
  const [params, setParams] = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState("");

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const windowWidth = useWindowWidth();

  const sortDorpdown = [
    {
      value: "recent",
      text: "최신순",
    },
    {
      value: "favorite",
      text: "좋아요순",
    },
  ];

  const getOrderBy = (e) => {
    setOrderBy(e.target.value);
  };

  const getSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setParams(
      searchKeyword
        ? {
            keyword: searchKeyword,
          }
        : ({}, { replace: true })
    );

    setSearchKeyword("");
  };

  useEffect(() => {
    setPageSize(windowWidth > 1199 ? 10 : windowWidth > 767 ? 6 : 4);
  }, [windowWidth]);

  useEffect(() => {
    let result;
    const fetchItems = async () => {
      try {
        const keyword = params.get("keyword") || "";
        result = await getItems({ orderBy, keyword, page, pageSize });
        setItems(result.list);
        setTotalCount(result.totalCount);
        console.log(result);
      } catch (e) {
        console.log(e);
        return;
      }
    };

    fetchItems();
  }, [orderBy, params, page, pageSize]);

  console.log(items.totalCount);

  return (
    <div className="ItemsList">
      {windowWidth > 767 ? (
        <section className="ItemsList__header">
          <h4 className="ItemsList__title">전체 상품</h4>
          <div className="ItemsList__handeling">
            <Search
              onChange={getSearchKeyword}
              onSubmit={handleSubmit}
              value={searchKeyword}
            />
            <Btn text={"상품 등록하기"} status={"active"} onClick={() => nav('/additem')}/>
            <Dropdown list={sortDorpdown} onChange={getOrderBy} />
          </div>
        </section>
      ) : (
        <section className="ItemsList__header--mobile">
          <div className="ItemsList__header--mobile--first">
            <h4 className="ItemsList__title">전체 상품</h4>
            <Btn text={"상품 등록하기"} />
          </div>
          <div className="ItemsList__header--mobile--sec">
            <Search
              onChange={getSearchKeyword}
              onSubmit={handleSubmit}
              value={searchKeyword}
            />
            <Dropdown list={sortDorpdown} onChange={getOrderBy} />
          </div>
        </section>
      )}
      <section className="ItemsList__cardSection">
        {items.map((item) => (
          <ItemCard item={item} />
        ))}
      </section>
      <section className="ItemsList__pagination">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPosts={totalCount}
          setPage={setPage}
        />
      </section>
    </div>
  );
}

export default ItemsList;
