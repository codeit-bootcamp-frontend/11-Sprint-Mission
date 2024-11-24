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

/**
 * 게시글 데이터 타입
 * @interface ArticleProps
 * @property {number} id 게시글 번호
 * @property {string} title 게시글 제목
 * @property {string} image 게시글 이미지
 * @property {object} writer 게시글 작성자
 * @property {number} likeCount 게시글 좋아요 수
 * @property {string} updatedAt 게시글 수정일
 */
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

/**
 * 좋아요 수 포맷
 * @param {number} likeCount 좋아요 수
 * @returns {string} 포맷된 좋아요 수
 */
const formatLikeCount = (likeCount: number) => {
  const MAX_LIKE = 9999;
  return likeCount > MAX_LIKE ? '9,999+' : likeCount.toLocaleString();
};

/**
 * 베스트 게시글 리스트
 * @param {number} count 베스트 게시글 개수
 * @returns {JSX.Element} 베스트 게시글 리스트
 */
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
                {formatLikeCount(article.likeCount)}
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
                {formatLikeCount(article.likeCount)}
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

          <BestArticleList count={3} />
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
