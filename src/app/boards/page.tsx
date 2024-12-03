'use client';

import styles from '../../styles/boards.module.css';

import React, { useEffect, useState } from 'react';
import { getBoardsList, Article } from '../../hooks/api';

import Link from 'next/link';

interface BoardsPageProps {}

const BoardsPage: React.FunctionComponent<BoardsPageProps> = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getBoardsList();

        // 좋아요 순 베스트 3개
        const sortedByLikes = [...data].sort(
          (a, b) => b.likeCount - a.likeCount
        );
        setBestArticles(sortedByLikes.slice(0, 3));

        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 검색 및 드롭다운 정렬
  const sortedArticles = articles
    .filter((article) => article.title.includes(searchQuery)) //검색기능
    //정렬
    .sort((a, b) => {
      if (sortOrder === 'latest') {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      }
      if (sortOrder === 'likes') {
        return b.likeCount - a.likeCount;
      }
      return 0;
    });

  if (loading) return <p>데이터 로딩중.......</p>;

  return (
    <div>
      {/* 베스트 게시글 */}
      <div style={{ marginBottom: '40px' }}>
        <h2 className={styles.subTitle}>베스트 게시글</h2>
        <ul>
          {bestArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/boards/${article.id}`} passHref>
                <div>
                  <h3>{article.title}</h3>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: '200px' }}
                  />
                </div>
              </Link>
              {/* <p>{article.content}</p> */}
              <div>
                <p>{article.writer.nickname}</p>
                <p>{article.likeCount}</p>
                <p>{article.updatedAt}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 상품 검색 */}
      <input
        placeholder="검색할 상품을 입력해주세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* 드롭다운 */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="sortOrder">정렬 기준: </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="likes">좋아요순</option>
        </select>
      </div>

      {/* 일반 게시글 리스트 */}
      <h2 className={styles.subTitle}>게시글</h2>
      <ul>
        {sortedArticles.map((article) => (
          <li key={article.id}>
            <Link href={`/boards/${article.id}`} passHref>
              <div>
                <h3>{article.title}</h3>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: '200px' }}
                />
              </div>
            </Link>
            <div>
              {/* <p>{article.content}</p> */}
              <p>{article.writer.nickname}</p>
              <p>{article.updatedAt}</p>
              <p>{article.likeCount}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardsPage;
