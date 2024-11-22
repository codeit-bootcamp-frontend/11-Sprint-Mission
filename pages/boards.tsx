import React, { useEffect } from 'react';
import styles from '@/styles/Board.module.css';
import BestCard from '@/components/BestCard';
import Button from '@/components/common/Button';
import Search from '@/components/common/Search';
import axios from '@/lib/axios';
import Card from '@/components/Card';

const Board = () => {
  const handleClick = () => {
    console.log('클릭');
  };

  const handleSearch = () => {};

  const getProduct = async () => {
    const res = await axios.get(`/articles?page=1&pageSize=3&orderBy=like`);
    const nextProduct = res.data;
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className={styles.boardContainer}>
      <section>
        <h2>베스트 게시글</h2>
        <BestCard />
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
