import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
import formatDate from '@/lib/formatDate';
import axiosInstance from '@/lib/api';
//
import Img from '@/components/Img';
//
import styles from '@/styles/Boards.module.css';
import IconMedal from '@/public/images/boards/ico-medal.svg';
import IconHeart from '@/public/images/common/ico-heart.svg';

const MAX_LIKE = 9999;

interface BestArticleProps {
  id: number;
  title: string;
  image: string;
  nickname: string;
  likeCount: number;
  updatedAt: string;
}

const BestArticle = ({ id, title, image, nickname, likeCount, updatedAt }: BestArticleProps) => {
  return (
    <li className={styles.bestArticle}>
      <span className={styles.badge}>
        <IconMedal />
        Best
      </span>

      <div className="flex gap-2">
        <Link href={`/boards/${id}`} className={clsx(styles.title, 'stretched-link')}>
          {title}
        </Link>
        <figure className={styles.thumbnail}>
          <Img src={image} className="{styles.img}" alt={title} fill />
        </figure>
      </div>

      <div className={styles.meta}>
        <p className="flex items-center">
          {nickname}
          <IconHeart className="ml-2 mr-1" />
          {likeCount > MAX_LIKE ? '9,999+' : likeCount.toLocaleString()}
        </p>
        <span>{formatDate(updatedAt)}</span>
      </div>
    </li>
  );
};

interface ArticleProps {
  id: number;
  title: string;
  image: string;
  writer: {
    nickname: string;
  };
  likeCount: number;
  updatedAt: string;
}

export default function Boards() {
  const [bestArticles, setBestArticles] = useState<ArticleProps[]>([]);

  const getBestArticles = async () => {
    const res = await axiosInstance.get('/articles?page=1&pageSize=3&orderBy=like');
    setBestArticles(res.data.list ?? []);
  };

  useEffect(() => {
    getBestArticles();
  }, []);

  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>

      <div className="container">
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>베스트 게시글</h1>
          <ul className="flex gap-6">
            {bestArticles.map((article) => (
              <BestArticle
                key={article.id}
                id={article.id}
                title={article.title}
                image={article.image}
                nickname={article.writer.nickname}
                likeCount={article.likeCount}
                updatedAt={article.updatedAt}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
