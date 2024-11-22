'use client';

import React, { useEffect, useState } from 'react';
import { getBoardsList, Article } from '../../hooks/api'; // API 가져오기

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>데이터 로딩중.......</p>;

  return (
    <div>
      <ul>
        {articles.map((article) => (
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
