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
import { useDispatch } from "react-redux";
import { setArticleDetail } from "../redux/articleSlice";
import { getArticleById } from "../api/api";

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
  isLiked: boolean;
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

const BoardPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [articleComments, setArticleComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        const result = await getArticleById(id);
        setArticle(result);
        dispatch(setArticleDetail(result));
        const commentsRes = await axios.get(
          `/articles/${id}/comments?limit=100`
        );
        setArticleComments(commentsRes.data.list ?? []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
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
        <CommentInput
          articleId={article.id}
          onAddComment={() => handleAddComment}
        />
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
