import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMutation } from "@tanstack/react-query";
import styles from "./ArticleInfo.module.css";
import { formatDate } from "../../util/formatDates";
import { toast } from "react-toastify";
import dotIcon from "../../assets/images/dotIcon.svg";
import profileBig from "../../assets/images/profileBig.svg";
import heartIcon from "../../assets/images/heartIcon.svg";
import heartIconRed from "../../assets/images/heartIconRed.svg";
import { deleteArticleFavorite, postArticleFavorite } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import { deleteArticleById } from "../../api/api";

interface Article {
  id: number;
  isLiked: boolean;
  title: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
  likeCount: number;
  content: string;
}

interface ArticleInfoProps {
  article: Article;
}

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  const [currentCount, setCurrentCount] = useState(article.likeCount);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const articleDetail = useSelector(
    (state: RootState) => state.article.article
  );
  const user = useSelector((state: RootState) => state.userInfo.user);
  const [clickFavorite, setClickFavorite] = useState(
    articleDetail?.isLiked || article.isLiked
  );
  const navigate = useNavigate();
  console.log(article);
  const postMutation = useMutation({
    mutationFn: () => postArticleFavorite(article.id),
    onSuccess: () => {
      toast.success("게시글 좋아요가 완료되었습니다.");
      setClickFavorite(true);
      setCurrentCount((prev) => prev + 1);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("게시글 좋아요가 실패했습니다. 다시 시도해주세요");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteArticleFavorite(article.id),
    onSuccess: () => {
      toast.success("게시글 좋아요를 취소했습니다.");
      setClickFavorite(false);
      setCurrentCount((prev) => prev - 1);
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("게시글 좋아요 취소에 실패했습니다. 다시 시도해주세요");
      }
    },
  });

  const handleFavoriteToggle = () => {
    if (clickFavorite) {
      deleteMutation.mutate();
    } else {
      postMutation.mutate();
    }
  };

  const handleEditArticle = (writerId: number) => {
    if (writerId !== article.writer.id) {
      toast.warning("본인이 등록한 게시글만 수정할 수 있습니다.");
      return;
    }
    navigate(`/addboard/${article.id}`);
  };

  const handleDeleteArticle = async (articleId: number, writerId: number) => {
    if (writerId !== article.writer.id) {
      toast.warning("본인이 등록한 게시글만 삭제할 수 있습니다.");
      return;
    }
    try {
      await deleteArticleById(articleId);
      toast.success("게시글이 삭제되었습니다.");
      navigate("/boards");
    } catch (error) {
      toast.error("게시글 삭제 실패");
      console.error("게시글 삭제 실패:", error);
    }
  };

  const isDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles.article}>{article.title}</p>
        <div className={styles.dot}>
          <img
            className={styles.image}
            src={dotIcon}
            alt="추가 메뉴 클릭 이미지"
            onClick={isDropdown}
          />
          {activeDropdown && (
            <div className="dropdown-menu">
              <button
                className="dropdown-text"
                onClick={() => handleEditArticle(user.id)}
              >
                수정하기
              </button>
              <button
                className="dropdown-text"
                onClick={() => handleDeleteArticle(article.id, user.id)}
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles["info-box"]}>
        <div className={styles.profile}>
          <div className={styles["profile-image"]}>
            <img
              className={styles.image}
              src={profileBig}
              alt="프로필 빅 이미지"
            />
          </div>
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles.like} onClick={handleFavoriteToggle}>
          <div className={styles.heart}>
            <img
              className={styles.image}
              src={clickFavorite ? heartIconRed : heartIcon}
              alt="좋아요 하트 이미지"
            />
          </div>
          <p className={styles.count}>{currentCount}</p>
        </div>
      </div>
      <p className={styles.content}>{article.content}</p>
    </section>
  );
};

export default ArticleInfo;
