import React from 'react';
import BestArticlesSection from '@components/boards/BestArticlesSection';
import AllArticlesSection from '@components/boards/AllArticlesSection';
import styles from '@styles/BoardPage.module.css';
import { GetServerSideProps } from 'next';
import { ArticleList } from '@components/types/articleTypes';
import { getAllArticles } from '@pages/api/boardApi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q = '', orderBy = 'recent', page = 1 } = context.query;

  try {
    const data = await getAllArticles(Number(page), String(orderBy), String(q));
    return {
      props: {
        initialArticles: data.list || [],
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        initialArticles: [],
      },
    };
  }
};

interface BoardsPageProps {
  initialArticles: ArticleList[];
}

export default function BoardsPage({ initialArticles }: BoardsPageProps) {
  return (
    <div className={styles['container']}>
      <BestArticlesSection />
      <AllArticlesSection initialArticles={initialArticles} />
    </div>
  );
}
