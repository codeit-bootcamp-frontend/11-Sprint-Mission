import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product, GetProductsResponse } from "@/types/commontypes";
import styles from "@/styles/items.module.css";
import BestItemCard from "./BestItemCard";
import getPageSize from "@/lib/utils/getPageSize";
import debounce from "@/lib/utils/debounce";

export default function BestItem() {
  const [items, setItems] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize("item"));

  const fetchProducts = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: string;
    pageSize: number;
  }) => {
    const products: GetProductsResponse = await getProducts({
      orderBy,
      pageSize,
    });
    setItems(products.list);
  };

  useEffect(() => {
    const handleFixSize = debounce(() => {
      setPageSize(getPageSize("item"));
    }, 300); // 300ms 딜레이로 debounce 적용

    window.addEventListener("resize", handleFixSize);
    fetchProducts({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleFixSize);
    };
  }, [pageSize]);

  return (
    <div className={styles.best_item_container}>
      <div className={styles.best_item_content}>
        <div className={styles.best_item_title}>베스트 상품</div>
        <div className={styles.best_item_card_container}>
          {items?.map((item) => (
            <BestItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
