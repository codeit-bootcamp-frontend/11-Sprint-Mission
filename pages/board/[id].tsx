import ArticleCommentInfo from "@/components/board/ArticleCommentInfo";
import ArticleInfo from "@/components/board/ArticleInfo";
import axios from "@/lib/axios";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import styles from "./[id].module.css";
import CommentInput from "@/components/board/CommentInput";

export async function getServerSideProps(context: any) {
  const articleId = context.params["id"];
  console.log(articleId);
  let article;
  try {
    const res = await axios.get(`/articles/${articleId}`);
    article = res.data;
  } catch (error) {
    return {
      notFound: true,
    };
  }

  const res = await axios.get(`/articles/${articleId}/comments?limit=100`);
  const articleComments = res.data.list ?? [];

  return {
    props: { article, articleComments },
  };
}

const DetailBoard = ({ article, articleComments }: any) => {
  console.log(article);
  console.log(articleComments);
  return (
    <div className={styles.container}>
      <ArticleInfo article={article} />
      <CommentInput />
      <ArticleCommentInfo articleComments={articleComments} />
      <button>
        <p>목록으로 돌아가기</p>
        <Image />
      </button>
    </div>
  );
};

export default DetailBoard;
