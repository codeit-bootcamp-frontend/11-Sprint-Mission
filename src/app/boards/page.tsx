'use client';

import React, { useEffect, useState } from 'react';
import { getBoardsList, Article } from '../../hooks/api'; // API 가져오기

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('latest'); // 정렬 기준 상태

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getBoardsList();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 드롭다운 정렬
  const sortedArticles = articles.sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    if (sortOrder === 'likes') {
      return b.likeCount - a.likeCount;
    }
    return 0;
  });

  if (loading) return <p>데이터 로딩중.......</p>;

  return (
    <div>
      {/* 드롭다운 */}
      <div style={{ marginBottom: '20px' }}>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="likes">좋아요순</option>
        </select>
      </div>

      {/* 게시글 */}
      <ul>
        {sortedArticles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Likes: {article.likeCount}</p>
            <p>Writer: {article.writer.nickname}</p>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '200px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
