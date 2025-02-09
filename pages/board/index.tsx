import React from 'react';
import BestArticlesSection from '@components/boards/BestArticlesSection';
import AllArticlesSection from '@components/boards/AllArticlesSection';
import styles from '@styles/BoardPage.module.css';

export default function BoardsPage() {
  return (
    <div className={styles['container']}>
      <BestArticlesSection />
      <AllArticlesSection />
    </div>
  );
}
