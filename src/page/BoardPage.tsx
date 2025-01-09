import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCommentInfo from "../components/Board/ArticleCommentInfo";
import ArticleInfo from "../components/Board/ArticleInfo";
import CommentInput from "../components/Board/CommentInput";
import axios from "../util/axios";
import styles from "./BoardPage.module.css";
import { Link } from "react-router-dom";
import NavBar from "../common/NavBar";
import returnIcon from "../assets/images/returnIcon.svg";

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

const BoardPage = () => {
  const { id } = useParams<{ id: string }>(); // react-router-dom을 사용하여 params 받아옴
  const [article, setArticle] = useState<Article | null>(null);
  const [articleComments, setArticleComments] = useState<ArticleComment[]>([]);

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const articleRes = await axios.get(`/articles/${id}`);
        setArticle(articleRes.data);

        const commentsRes = await axios.get(
          `/articles/${id}/comments?limit=100`
        );
        setArticleComments(commentsRes.data.list ?? []);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    if (id) {
      fetchArticleData();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleAddComment = (newComment: ArticleComment) => {
    setArticleComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <ArticleInfo article={article} />
        <CommentInput articleId={article.id} onAddComment={handleAddComment} />
        <ArticleCommentInfo articleComments={articleComments} />
        <Link to="/boards" className={styles.link}>
          <button className={styles.button}>
            <p className={styles.text}>목록으로 돌아가기</p>
            <div className={styles.return}>
              <img
                className={styles.image}
                src={returnIcon}
                alt="목록으로 돌아가는 이미지"
              />
            </div>
          </button>
        </Link>
      </div>
    </>
  );
};

export default BoardPage;
