import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import { Product, GetProductsResponse } from "@/types/commontypes";
import styles from "@/styles/items.module.css";

const getPageSize = () => {
  if (typeof window === "undefined") return 4;
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1280) {
    return 2;
  } else {
    return 4;
  }
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function BestItem() {
  const [items, setItems] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(getPageSize);

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
      setPageSize(getPageSize());
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
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestItem;
