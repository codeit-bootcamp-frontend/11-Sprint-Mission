import React, { useEffect, useState } from 'react';
import styles from '@/styles/Board.module.css';
import BestCard from '@/components/BestCard';
import Button from '@/components/common/Button';
import Search from '@/components/common/Search';
import Card from '@/components/Card';
import useResize, { ScreenType } from '@/hooks/useResize';
import { getProducts, Product, ProductResult } from '@/api/productApi';

const Board = () => {
  const screenType = useResize(); // useResize 훅 사용
  const [page, setPage] = useState(1); // 페이지 번호
  const [bestProducts, setBestProducts] = useState<ProductResult[]>([]);
  const [order, setOrder] = useState('');

  const handleClick = () => {
    console.log('클릭');
  };

  const handleSearch = () => {};

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

  useEffect(() => {
    if (!screenType) return;

    const size = getSizeForScreenType(screenType);
    const param: Product = {
      page: page,
      pageSize: size,
      orderBy: 'favorite',
    };

    fetchBestProducts(param);
  }, [screenType, page]);

  return (
    <div className={styles.boardContainer}>
      <section>
        <h2>베스트 게시글</h2>
        {bestProducts.map((data) => {
          return (
            <React.Fragment key={data.id}>
              <BestCard bestProducts={data} />
            </React.Fragment>
          );
        })}
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
        <Search onSearch={handleSearch} addClassName="boardSearch" />
        <Card />
        <Card />
        <Card />
      </section>
    </div>
  );
};

export default Board;
