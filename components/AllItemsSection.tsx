import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import ItemCard from '@components/ItemCard';
import '../style/Items.css';
import SearchIcon from '@public/svgs/ic_search.svg';
import {
  Product,
  ProductListResponse,
  ProductOrderBy,
} from './types/productTypes';
import Link from 'next/link';

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 4;
  } else if (width < 1280) {
    // Tablet viewport
    return 6;
  } else {
    // Desktop viewport
    return 10;
  }
};

function AllItemsSection() {
  const [orderBy, setOrderBy] = useState<ProductOrderBy>('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [itemList, setItemList] = useState<Product[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [totalPageNum, setTotalPageNum] = useState(1);

  const fetchSortedData = async ({
    orderBy,
    page,
    pageSize,
  }: {
    orderBy: ProductOrderBy;
    page: number;
    pageSize: number;
  }) => {
    try {
      const products: ProductListResponse = await getProducts({
        orderBy,
        page,
        pageSize,
      });
      setItemList(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    } catch (error) {
      throw new Error('정보를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    const handleFixsize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener('resize', handleFixsize);
    fetchSortedData({ orderBy, page, pageSize });

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleFixsize);
    };
  }, [orderBy, page, pageSize]);

  return (
    <div className="allItemsContainer">
      <div className="allItemsHeader">
        <h1 className="sectionTitle">전체 상품</h1>
        <div className="allItemsSectionHeader">
          <div className="searchBarWrapper">
            <SearchIcon />
            <input
              className="searchBarInput"
              placeholder="검색할 상품을 입력해 주세요"
            />
          </div>
          <Link className="itemRegisterbtn" href="/additem">
            상품 등록하기
          </Link>
        </div>
      </div>

      <div className="allItemsCardSection">
        {itemList?.map((item) => (
          <ItemCard item={item} key={`market-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default AllItemsSection;
