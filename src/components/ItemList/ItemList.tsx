import { useEffect, useState } from "react";
import { getProductList } from "../../api";
import ListItem from "../ListItem/ListItem";
import "./ItemList.css";
import Pagination from "../Pagination/Pagination";
import arrowDown from "../../assets/images/ic_arrow_down.svg";
import ic_sort from "../../assets/images/ic_sort.svg";
import ic_search from "../../assets/images/ic_search.svg";
import { DeviceType, useDeviceType } from "../../contexts/DeviceTypeContext";
import { Link } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import { Product } from "../../types/Product";

const PAGE_SIZE = {
  desktop: 12,
  tablet: 6,
  mobile: 4,
} as const;

function ItemList() {
  const [items, setItems] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>("recent");
  const [total, setTotal] = useState<number>(0);
  const { execute: getProductsAsync } = useAsync(getProductList);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductsAsync(page, PAGE_SIZE[deviceType], order);
      setItems(result.list);
      setTotal(result.totalCount);
    };
    fetchData();
  }, [deviceType, page, order, getProductsAsync]);

  return (
    <div className="ItemList">
      <Header deviceType={deviceType} order={order} setOrder={setOrder} />
      <Content items={items} />
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={PAGE_SIZE[deviceType]}
        total={total}
      />
    </div>
  );
}

function Header({
  deviceType,
  order,
  setOrder,
}: {
  deviceType: DeviceType;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (deviceType !== "mobile") {
    return (
      <div className="ItemList-header">
        <h2 className="title">전체 상품</h2>
        <div className="utils">
          <Search />
          <Link className="btn-add" to="/additem">
            <span>상품 등록하기</span>
          </Link>
          <Select deviceType={deviceType} order={order} setOrder={setOrder} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="ItemList-header">
        <div className="mobile-wrap">
          <h2 className="title">전체 상품</h2>
          <Link className="btn-add" to="/additem">
            <span>상품 등록하기</span>
          </Link>
        </div>
        <div className="mobile-wrap">
          <Search />
          <Select deviceType={deviceType} order={order} setOrder={setOrder} />
        </div>
      </div>
    );
  }
}

function Search() {
  return (
    <form className="search-form">
      <img src={ic_search} alt="검색" />
      <input placeholder="검색할 상품을 입력해주세요" />
    </form>
  );
}

function Select({
  deviceType,
  order,
  setOrder,
}: {
  deviceType: DeviceType;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSelectClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const select = event.currentTarget;
    if (!(select instanceof HTMLElement)) return;

    const option = select.querySelector(".option-wrap");
    if (!(option instanceof HTMLElement)) return;

    option.classList.toggle("show");
  };

  const handleSelectChange = (event: React.MouseEvent<HTMLDivElement>) => {
    const option = event.target;
    if (!(option instanceof HTMLElement)) return;
    const orderBy = option.dataset.order;
    if (orderBy) {
      setOrder(orderBy);
    }
  };

  return (
    <div className="select-order" onClick={handleSelectClick}>
      {deviceType !== "mobile" ? (
        <>
          <p>{order === "recent" ? "최신순" : "좋아요순"}</p>
          <img src={arrowDown} alt="▼" />
        </>
      ) : (
        <img src={ic_sort} alt="▼" />
      )}
      <div className="option-wrap" onClick={handleSelectChange}>
        <div className="option" data-order="recent">
          최신순
        </div>
        <div className="option" data-order="favorite">
          좋아요순
        </div>
      </div>
    </div>
  );
}

function Content({ items }: { items: Product[] }) {
  return (
    <ul className="ItemList-content">
      {items.map((item) => (
        <li key={item.id}>
          <ListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
