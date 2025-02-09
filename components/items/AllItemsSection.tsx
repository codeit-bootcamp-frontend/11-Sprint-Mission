import { useEffect, useState } from 'react';
import { getProducts } from '@lib/api';
import ItemCard from '@components/items/ItemCard';
import styles from '@styles/Items.module.css';
import SearchIcon from '@public/svgs/ic_search.svg';
import {
  Product,
  ProductListResponse,
  ProductOrderBy,
} from '@components/types/productTypes';
import Link from 'next/link';

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 4; // Mobile viewport
  } else if (width < 1280) {
    return 6; // Tablet viewport
  } else {
    return 10; // Desktop viewport
  }
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState<ProductOrderBy>('recent');
  const [page, setPage] = useState(1);

  // 초기값 설정에서 window.innerWidth 사용
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined' ? getPageSize(window.innerWidth) : 10,
  );

  const [itemList, setItemList] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const fetchSortedData = async (params: {
    orderBy: ProductOrderBy;
    page: number;
    pageSize: number;
  }) => {
    try {
      const products: ProductListResponse = await getProducts(params);
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / params.pageSize));
    } catch (error) {
      throw new Error('정보를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산
    window.addEventListener('resize', handleResize);

    // 데이터 가져오기
    fetchSortedData({ orderBy, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [orderBy, page, pageSize]);

  return (
    <div className={styles['allItemsContainer']}>
      <div className={styles['allItemsHeader']}>
        <h1 className={styles['sectionTitle']}>전체 상품</h1>
        <div className={styles['allItemsSectionHeader']}>
          <div className={styles['searchBarWrapper']}>
            <SearchIcon />
            <input
              className={styles['searchBarInput']}
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <Link className={styles['itemRegisterbtn']} href="/additem">
            상품 등록하기
          </Link>
        </div>
      </div>

      <div className={styles['allItemsCardSection']}>
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default AllItemsSection;
