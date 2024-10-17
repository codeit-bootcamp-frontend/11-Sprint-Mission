import Searchbox from "./Searchbox";
import ItemSubmit from "./ItemSubmit";
import DropDownbtn from "./DropDownbtn";
import "./Allitem.css";
import { getAllProducts } from "../api/api";
import ListItem from "./ItemList";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import Pagination from "./Pagination";
import useHandleResize from "../hooks/UseDebouceSize";

const Allitem = () => {
  const [productList, setProductList] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { pageSize, isMobile } = useHandleResize(false);

  const loadList = async ({ orderBy, page, pageSize }) => {
    const itmes = await getAllProducts({ orderBy, page, pageSize });
    setProductList(itmes.list);
    setTotalPageNum(Math.ceil(itmes.totalCount / pageSize));
  };
  const handleOrderChange = useCallback((newOrder) => {
    setOrderBy(newOrder);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    loadList({ orderBy, page, pageSize });
  }, [orderBy, page, pageSize]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const sortedItems = useMemo(() => {
    return [...productList].sort((a, b) => b[orderBy] - a[orderBy]);
  }, [productList, orderBy]);

  return (
    <>
      <div className="aitop">
        <div className="m-Item-flex">
          <h1>전체상품</h1>
          <div className="mItemsubmit">{isMobile && <ItemSubmit />}</div>
        </div>
        <div className="aitop-flex">
          <Searchbox />
          {!isMobile && <ItemSubmit />}
          <DropDownbtn
            orderBy={orderBy}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOrderChange={handleOrderChange}
          />
        </div>
      </div>
      <div className="allitem-con">
        {sortedItems.map((item) => (
          <ListItem item={item} key={`all-item-${item.id}`} />
        ))}
      </div>
      <Pagination
        totalPageNum={totalPageNum}
        activePageNum={page}
        onPageChange={onPageChange}
      />
    </>
  );
};
export default Allitem;
