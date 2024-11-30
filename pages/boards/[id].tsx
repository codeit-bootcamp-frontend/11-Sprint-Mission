import Link from 'next/link';
import { GetServerSidePropsContext } from 'next/types';
import axiosInstance from '@/lib/api';
import formatDate from '@/lib/formatDate';
import { Article } from '@/types/article.type';
//
import styles from '@/styles/Article.module.css';
import BaseThumbnail from '@/public/images/common/base-thumbnail.svg';
import IconHeart from '@/public/images/common/ico-heart.svg';
import IconBack from '@/public/images/boards/ico-back.svg';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id;
  if (!id) return { notFound: true };

  let article: Article | null = null;
  try {
    const res = await axiosInstance.get(`/articles/${id}`);
    article = res.data;
  } catch (error) {
    return { notFound: true };
  }

  return { props: { article } };
};

export default function Board({ article }: { article: Article }) {
  const { title, content, updatedAt, writer, likeCount } = article;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container py-8">
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.meta}>
        <BaseThumbnail />
        <span className={styles.name}>{writer.nickname}</span>
        <span className={styles.date}>{formatDate(updatedAt, '. ')}</span>
        <span className="v-bar"></span>
        <span className={styles.like}>
          <IconHeart className="size-8" />
          {likeCount}
        </span>
      </div>
      <p className={styles.content}>{content}</p>

      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="comment" className="label">
          댓글 달기
        </label>
        <textarea
          id="comment"
          className="input"
          name="comment"
          placeholder="댓글을 입력해주세요."
          rows={3}
        />
        <button type="submit" className="btn self-end" disabled>
          등록
        </button>
      </form>

      <ul className="flex flex-col gap-4">
        <li>
          <span>작성자</span>
          <span>댓글 내용</span>
        </li>
      </ul>

      <div className="my-16 flex justify-center">
        <Link href="/boards" className="btn btn-rounded">
          목록으로 돌아가기
          <IconBack className="size-6" />
        </Link>
      </div>
    </div>
  );
}
