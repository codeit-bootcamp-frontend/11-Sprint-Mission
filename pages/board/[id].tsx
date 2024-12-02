import ArticleCommentInfo from "@/components/board/ArticleCommentInfo";
import ArticleInfo from "@/components/board/ArticleInfo";
import axios from "@/lib/axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import styles from "./[id].module.css";
import CommentInput from "@/components/board/CommentInput";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

type Comment = {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
};

type ArticleComment = Comment;

interface DetailBoardProps {
  article: Article;
  articleComments: Comment[];
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const articleId = context.params["id"];

  let article: Article;
  try {
    const res = await axios.get(`/articles/${articleId}`);
    article = res.data;
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const res = await axios.get(`/articles/${articleId}/comments?limit=100`);
  const articleComments: ArticleComment[] = res.data.list ?? [];

  return {
    props: { article, articleComments },
  };
}

const DetailBoard = ({
  article,
  articleComments: initialComments,
}: DetailBoardProps) => {
  const [articleComments, setArticleComments] =
    useState<ArticleComment[]>(initialComments);

  const handleAddComment = (newComment: ArticleComment) => {
    setArticleComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className={styles.container}>
      <ArticleInfo article={article} />
      <CommentInput articleId={article.id} onAddComment={handleAddComment} />
      <ArticleCommentInfo articleComments={articleComments} />
      <Link href="/boards" className={styles.link}>
        <button className={styles.button}>
          <p className={styles.text}>목록으로 돌아가기</p>
          <div className={styles.return}>
            <Image
              className={styles.image}
              fill
              src="/images/returnIcon.svg"
              alt="목록으로 돌아가는 이미지"
            />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default DetailBoard;
