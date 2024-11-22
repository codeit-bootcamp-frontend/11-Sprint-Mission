import "./BestItem.css";
import { getBestProducts } from "../api/api";
import ListItem from "./ItemList";
import { useEffect, useState, useCallback } from "react";
import useHandleResize from "../hooks/UseDebouceSize";
import { Product, LoadList } from "../types/type";

const BestItem = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const { pageSize } = useHandleResize(true);

  const loadList = useCallback(
    async ({ orderBy = "favorite", page = 1, pageSize }: LoadList) => {
      const items = await getBestProducts({ orderBy, page, pageSize });

      // API 응답을 Product[] 형태로 변환하여 상태에 설정
      const products: Product[] = items.list.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        images: item.images,
        favoriteCount: item.favoriteCount,
      }));

      setProductList(products);
    },
    []
  );

  useEffect(() => {
    loadList({ orderBy: "favorite", pageSize });
  }, [pageSize, loadList]);

  return (
    <div className="bitop">
      <h1>베스트 상품</h1>
      <div className="best-item-con">
        {productList?.map((item) => (
          <ListItem item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};

export default BestItem;
