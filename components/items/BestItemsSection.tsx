import { useEffect, useState } from 'react';
import { getProducts } from '@lib/api';
import ItemCard from '@/components/items/ItemCard';
import styles from '@styles/Items.module.css';
import {
  Product,
  ProductListResponse,
  ProductOrderBy,
} from '@components/types/productTypes';

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 1; // Mobile viewport
  } else if (width < 1280) {
    return 2; // Tablet viewport
  } else {
    return 3; // Desktop viewport
  }
};

function BestItemSection() {
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState(
    () => (typeof window !== 'undefined' ? getPageSize(window.innerWidth) : 3), // 초기값
  );

  const fetchSortedData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: ProductOrderBy;
    pageSize: number;
  }) => {
    const products: ProductListResponse = await getProducts({
      orderBy,
      pageSize,
    });
    setItemList(products.list);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    fetchSortedData({ orderBy: 'favorite', pageSize });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pageSize]);

  return (
    <div className={styles['bestItemsContainer']}>
      <h1 className={styles['sectionTitle']}>베스트 상품</h1>

      <div className={styles['bestItemsCard']}>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItemSection;
