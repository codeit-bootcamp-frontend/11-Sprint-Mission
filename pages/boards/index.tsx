import React, { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/Board.module.css';
import BestCard from '@/components/BestCard';
import Button from '@/components/common/Button';
import Search from '@/components/common/Search';
import Card from '@/components/Card';
import useResize, { ScreenType } from '@/hooks/useResize';
import {
  getProducts,
  OrderType,
  Product,
  ProductResult,
} from '@/api/productApi';
import Dropdown, { DropdownItem } from '@/components/common/Dropdown';
import debounce from 'lodash.debounce';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const items: DropdownItem[] = [
  { id: 0, label: '최신순', value: 'recent' },
  { id: 1, label: '좋아요순', value: 'favorite' },
];

const Board = () => {
  const screenType = useResize(); // useResize 훅 사용
  const [page, setPage] = useState(1); // 페이지 번호
  const [bestProducts, setBestProducts] = useState<ProductResult[]>([]);
  const [allProducts, setAllProducts] = useState<ProductResult[]>([]);
  const [order, setOrder] = useState<OrderType>('recent');
  const router = useRouter();

  const getSizeForScreenType = (screenType: ScreenType | null): number => {
    const sizeMap = {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    };

    if (!screenType || !sizeMap[screenType]) {
      return 1;
    }

    return sizeMap[screenType] || 1;
  };

  const fetchBestProducts = async (param: Product): Promise<void> => {
    try {
      const response = await getProducts(param);
      setBestProducts(response.data.list);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllProducts = useMemo(
    () =>
      debounce(async (param: Product | {}) => {
        try {
          const response = await getProducts(param);
          setAllProducts(response.data.list);
        } catch (error) {
          console.error(error);
        }
      }, 500),
    [],
  );

  const handleClick = () => {
    router.push(`/posts?query=테스트!`);
    console.log('클릭');
  };

  const handleSearch = (query: string) => {
    const params = {
      orderBy: order,
      keyword: query,
    };

    fetchAllProducts(params);
  };

  useEffect(() => {
    if (!screenType) return;

    const size = getSizeForScreenType(screenType);
    const param: Product = {
      page: page,
      pageSize: size,
      orderBy: 'favorite',
    };

    fetchBestProducts(param);
    fetchAllProducts({});
  }, [screenType, page, fetchAllProducts]);

  return (
    <div className={styles.boardContainer}>
      <section>
        <h2>베스트 게시글</h2>
        <div className={styles.bestCardBox}>
          {bestProducts.map((data) => {
            return (
              <React.Fragment key={data.id}>
                <BestCard bestProducts={data} />
              </React.Fragment>
            );
          })}
        </div>
      </section>
      <section className={styles.boardBox}>
        <div className={styles.titles}>
          <h2>게시글</h2>
          <Button
            addClassName="buttonMiddle"
            handleClick={handleClick}
            disabled={false}
          >
            글쓰기
          </Button>
        </div>
        <div className={styles.searchBox}>
          <Search onSearch={handleSearch} addClassName="boardSearch" />
          <Dropdown
            items={items}
            screenType={screenType}
            onclickSelect={(select) => {
              fetchAllProducts({ orderBy: select });
              setOrder(select);
            }}
          />
        </div>
        {allProducts.map((data) => {
          return <Card products={data} key={data.id} />;
        })}
      </section>
    </div>
  );
};

export default Board;
