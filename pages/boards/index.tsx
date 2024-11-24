import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import formatDate from '@/lib/formatDate';
import axiosInstance from '@/lib/api';
//
// import Img from '@/components/Img';
//
import styles from '@/styles/Boards.module.css';
import IconMedal from '@/public/images/boards/ico-medal.svg';
import IconHeart from '@/public/images/common/ico-heart.svg';
import IconSearch from '@/public/images/common/ico-search.svg';
import BaseThumbnail from '@/public/images/common/base-thumbnail.svg';
import NoImage from '@/public/images/common/no-image.svg?url';

const MAX_LIKE = 9999;

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

const BestArticleList = ({ count }: { count: number }) => {
  const [bestArticles, setBestArticles] = useState<ArticleProps[]>([]);

  const getBestArticles = async () => {
    const res = await axiosInstance.get(`/articles?page=1&pageSize=${count}&orderBy=like`);
    setBestArticles(res.data.list ?? []);
  };

  useEffect(() => {
    getBestArticles();
  }, [count]);

  return (
    <ul className="flex gap-6">
      {bestArticles.map((article) => (
        <li className={styles.bestArticle} key={article.id}>
          <span className={styles.badge}>
            <IconMedal />
            Best
          </span>

          <div className="flex gap-2">
            <h2 className={styles.title}>
              <Link href={`/boards/${article.id}`} className="stretched-link">
                {article.title}
              </Link>
            </h2>
            <figure className={styles.thumbnail}>
              <img
                src={article.image || NoImage}
                className={styles.img}
                alt={article.title}
                onError={(e) => (e.currentTarget.src = NoImage.src)}
              />
            </figure>
          </div>

          <div className={styles.meta}>
            <p className="flex items-center">
              {article.writer.nickname}
              <span className={styles.like}>
                <IconHeart className="ml-2 mr-1 inline-block" />
                {article.likeCount > MAX_LIKE ? '9,999+' : article.likeCount.toLocaleString()}
              </span>
            </p>
            <span className={styles.date}>{formatDate(article.updatedAt, '. ')}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

const ArticleList = () => {
  return;
};

export default function Boards() {
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  // TODO: 나중에 페이지네이션 처리
  const getArticles = async (orderBy: 'recent' | 'like', keyword: string) => {
    const res = await axiosInstance.get(
      `/articles?page=1&pageSize=10&orderBy=${orderBy}&keyword=${keyword}`,
    );
    setArticles(res.data.list ?? []);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getArticles(orderBy, keyword);
  };

  useEffect(() => {
    getArticles(orderBy, keyword);
  }, [orderBy]);

  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>

      <div className="container">
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>베스트 게시글</h1>
          <BestArticleList count={3} />
        </section>

        <section className={styles.section}>
          <header className="flex items-center justify-between">
            <h1 className={styles.sectionTitle}>게시글</h1>
            <button className="btn" type="button">
              글쓰기
            </button>
          </header>

          <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className="relative flex-1">
              <label htmlFor="search" className="absolute left-4 top-1/2 -translate-y-1/2">
                <IconSearch />
              </label>
              <input
                type="text"
                className="input input-small input-icon"
                id="search"
                placeholder="검색할 상품을 입력해 주세요."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <select
              className="select input-small"
              name="orderBy"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value as 'recent' | 'like')}
            >
              <option value="recent">최신순</option>
              <option value="like">좋아요순</option>
            </select>
          </form>

          <ul className="flex flex-col gap-6">
            {articles.map((article) => (
              <li className="relative border-b pb-6" key={article.id}>
                <div className="mb-4 flex gap-2">
                  <h2 className={styles.title}>
                    <Link href={`/boards/${article.id}`} className="stretched-link">
                      {article.title}
                    </Link>
                  </h2>
                  <figure className={styles.thumbnail}>
                    <img
                      className={styles.img}
                      src={article.image || NoImage}
                      alt={article.title}
                      onError={(e) => (e.currentTarget.src = NoImage.src)}
                    />
                  </figure>
                </div>

                <div className={styles.meta}>
                  <p className="flex items-center gap-2">
                    <BaseThumbnail width={24} height={24} />
                    {article.writer.nickname}
                    <span className={styles.date}>{formatDate(article.updatedAt, '. ')}</span>
                  </p>
                  <span className={styles.like}>
                    <IconHeart className="mr-1 inline-block" />
                    {article.likeCount > MAX_LIKE ? '9,999+' : article.likeCount.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
