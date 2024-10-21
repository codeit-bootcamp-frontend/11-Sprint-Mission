import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBestItems } from "../../api";
import BestProductItem from "./BestProductItem";
import "./BestProduct.css";

function BestProduct() {
  const [items, setItems] = useState([]);
  const [pageSize, setPageSize] = useState(4); // 해상도에 따라 동적으로 설정

  const itemsLoad = async (options) => {
    const { list } = await getBestItems(options);
    setItems(list);
  };

  // 해상도에 따라 pageSize 변경
  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1200) {
        setPageSize(4); // 데스크탑
      } else if (window.innerWidth >= 744) {
        setPageSize(2); // 태블릿
      } else {
        setPageSize(1); // 모바일
      }
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    // 페이지 사이즈가 설정된 후에 데이터 로드
    // itemsLoad(pageSize);

    return () => window.removeEventListener("resize", updatePageSize);
  }, []); // pageSize가 변경될 때마다 itemsLoad 호출

  useEffect(() => {
    itemsLoad({ pageSize });
  }, [pageSize]);

  return (
    <section>
      <div className="bestProduct__inner">
        <h2 className="bestProduct__title">베스트 상품</h2>

        <ul className="bestProduct__list">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/items/${item.id}`}>
                  <BestProductItem item={item} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default BestProduct;
