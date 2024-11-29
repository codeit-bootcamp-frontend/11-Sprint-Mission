import React, { useEffect, useState } from "react";
// import HeartIcon from "../images/ic_heart.svg";
import ItemCard from "./ItemCard";
import { getProducts } from "@/api/api";
import { Product, ProductListResponse } from "@/types/Types";

const getPageSize = (width: number) => {
  if (width < 768) {
    // 모바일
    return 1;
  } else if (width < 1280) {
    // 태블릿
    return 2;
  } else {
    // pc
    return 4;
  }
};

// 너비 추적
const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width;
};

const BestProduct = () => {
  const [itemList, setItemList] = useState<Product[]>([]);
  // const pageSize = 4;
  // const [pageSize, setPageSize] = useState(getPageSize());
  const [pageSize, setPageSize] = useState<number | null>(null);

  const viewportWidth = useViewport();

  // const sortedData = async ({
  //   orderBy,
  //   pageSize,
  // }: {
  //   orderBy: string;
  //   pageSize: number;
  // }) => {
  //   const products = await getProducts({ orderBy });
  //   setItemList(products.list);
  // };

  // // useEffect(() => {
  // //   sortedData({ orderBy: "favorite", pageSize });
  // // }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setPageSize(getPageSize());
  //   };

  //   // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
  //   // window.addEventListener("resize", handleResize);
  //   // 페이지가 로드될 때 호출
  //   if (typeof window !== "undefined") {
  //     setPageSize(getPageSize()); // 클라이언트에서 초기 값 설정
  //     window.addEventListener("resize", handleResize); // 화면 크기 변경 시 업데이트
  //   }

  //   sortedData({ orderBy: "favorite", pageSize });

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("resize", handleResize);
  //     }
  //   };
  // }, [pageSize]);

  // viewportWidth 값이 변경될 때마다 getPageSize 함수를 사용해 새로운 pageSize를 계산하고, 이전 값과 다를 경우 setPageSize를 호출하여 업데이트
  useEffect(() => {
    if (viewportWidth === 0) return; // viewportWidth의 초기 값 확인

    const newPageSize = getPageSize(viewportWidth);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  }, [viewportWidth, pageSize]);

  // pageSize 값이 변경될 때마다 데이터를 비동기로 가져오는 로직
  useEffect(() => {
    if (pageSize === null) return;

    const fetchSortedData = async () => {
      try {
        const data: ProductListResponse = await getProducts({
          orderBy: "favorite",
          pageSize,
        });
        setItemList(data.list);
      } catch (error) {
        console.error("오류: ", error);
      }
    };

    fetchSortedData();
  }, [pageSize]);

  return (
    <div className="bestItemsContainer">
      <h1>베스트 상품</h1>

      <div>
        {itemList.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};

export default BestProduct;
