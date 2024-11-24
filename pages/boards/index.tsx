import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import formatDate from '@/lib/formatDate';
import formatMaxCount from '@/lib/formatMaxCount';
import { OrderByType, getArticleList } from '@/lib/api';
import { Article } from '@/types/article.type';
//
import Img from '@/components/Img';
//
import styles from '@/styles/Boards.module.css';
import IconMedal from '@/public/images/boards/ico-medal.svg';
import IconHeart from '@/public/images/common/ico-heart.svg';
import IconSearch from '@/public/images/common/ico-search.svg';
import BaseThumbnail from '@/public/images/common/base-thumbnail.svg';

/**
 * 베스트 게시글 리스트
 * @returns {JSX.Element} 베스트 게시글 리스트
 */
const BestArticleList = () => {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getBestArticles = async () => {
      const data = await getArticleList({ pageSize: 3, orderBy: 'like' });
      setBestArticles(data.list ?? []);
    };

    getBestArticles();
  }, []);

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
              <Img useImg src={article.image} className={styles.img} alt={article.title} />
            </figure>
          </div>

          <div className={styles.meta}>
            <p className="flex items-center">
              {article.writer.nickname}
              <span className={styles.like}>
                <IconHeart className="ml-2 mr-1 inline-block" />
                {formatMaxCount(article.likeCount)}
              </span>
            </p>
            <span className={styles.date}>{formatDate(article.updatedAt, '. ')}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

/**
 * 게시글 리스트 컴포넌트
 * @returns {JSX.Element} 게시글 리스트 + 검색 폼
 */
const ArticleListWithSearch = () => {
  const [orderBy, setOrderBy] = useState<OrderByType>('recent');
  const [articles, setArticles] = useState<Article[]>([]);
  const keywordRef = useRef<HTMLInputElement | null>(null);

  // TODO: 나중에 페이지네이션 처리
  const getArticles = async (orderBy: OrderByType) => {
    const keyword = keywordRef.current?.value ?? '';
    const data = await getArticleList({ orderBy, keyword });
    setArticles(data.list ?? []);
  };

  // select 요소 변경 이벤트 핸들러
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value as OrderByType);
  };

  // 검색 폼 제출 이벤트 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getArticles(orderBy);
  };

  useEffect(() => {
    getArticles(orderBy);
  }, [orderBy]);

  return (
    <>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <label htmlFor="search" className="absolute left-4 top-1/2 -translate-y-1/2">
            <IconSearch />
          </label>
          <input
            id="search"
            type="text"
            className="input input-small input-icon"
            placeholder="검색할 상품을 입력해 주세요."
            ref={keywordRef}
          />
        </div>
        <select
          className="select input-small"
          name="orderBy"
          value={orderBy}
          onChange={handleSelectChange}
        >
          <option value="recent">최신순</option>
          <option value="like">좋아요순</option>
        </select>
      </form>

      <ul className={styles.articles}>
        {articles.map((article) => (
          <li className="relative border-b pb-6" key={article.id}>
            <div className="mb-4 flex gap-2">
              <h2 className={styles.title}>
                <Link href={`/boards/${article.id}`} className="stretched-link">
                  {article.title}
                </Link>
              </h2>
              <figure className={styles.thumbnail}>
                <Img useImg className={styles.img} src={article.image} alt={article.title} />
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
                {formatMaxCount(article.likeCount)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

/**
 * 게시판 페이지
 * @returns {JSX.Element} 베스트 게시글 + 게시글 리스트
 */
export default function Boards() {
  return (
    <>
      <Head>
        <title>자유게시판 | 판다마켓</title>
      </Head>

      <div className="container">
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>베스트 게시글</h1>

          <BestArticleList />
        </section>

        <section className={styles.section}>
          <header className="flex items-center justify-between">
            <h1 className={styles.sectionTitle}>게시글</h1>
            <button className="btn" type="button">
              글쓰기
            </button>
          </header>

          <ArticleListWithSearch />
        </section>
      </div>
    </>
  );
}
