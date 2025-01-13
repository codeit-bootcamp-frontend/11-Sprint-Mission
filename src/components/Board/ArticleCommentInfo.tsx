import React, { useState } from "react";
import { FormatDateAgo } from "../../util/FormatDate";
import styles from "./ArticleCommentInfo.module.css";
import dotIcon from "../../assets/images/dotIcon.svg";
import profileBig from "../../assets/images/profileBig.svg";
import noArticleComments from "../../assets/images/noArticleComments.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteCommentsById, updateCommentsById } from "../../api/api";
import { setComment } from "../../redux/commentSlice";

interface ArticleComment {
  id: number;
  content: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
}

interface ArticleCommentInfoProps {
  articleComments: ArticleComment[];
  updateComments: React.Dispatch<React.SetStateAction<ArticleComment[]>>;
}

const ArticleCommentInfo = ({
  articleComments,
  updateComments,
}: ArticleCommentInfoProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const dispatch = useDispatch();
  const comments = useSelector(
    (state: RootState) => state.commentList.comments
  );
  const user = useSelector((state: RootState) => state.userInfo.user);

  const handleEditClick = (comment: ArticleComment) => {
    setEditingCommentId(comment.id);
    setEditedContent(comment.content);
    setActiveDropdownId(null);
  };

  const handleEditSave = async (commentId: number, writerId: number) => {
    if (writerId !== user.id) {
      toast.warning("본인의 댓글만 수정할 수 있습니다.");
      return;
    }
    try {
      await updateCommentsById(commentId, { content: editedContent });
      updateComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, content: editedContent }
            : comment
        )
      );
      toast.success("댓글 수정 완료");
      setEditingCommentId(null);
    } catch (error) {
      toast.error("댓글 수정 실패");
      console.error(error);
    }
  };

  const handleDeleteClick = async (commentId: number, writerId: number) => {
    if (writerId !== user.id) {
      toast.warning("본인의 댓글만 삭제할 수 있습니다.");
      return;
    }
    try {
      await deleteCommentsById(commentId);
      updateComments((prev) =>
        prev.filter((comment) => comment.id !== commentId)
      );
      toast.success("댓글 삭제 완료");
    } catch (error) {
      toast.error("댓글 삭제 실패");
      console.error(error);
    }
  };

  const toggleDropdown = (commentId: number) => {
    setActiveDropdownId((prev) => (prev === commentId ? null : commentId));
  };

  if (!articleComments || articleComments.length === 0) {
    return (
      <section className={styles["no-container"]}>
        <div className={styles["no-comments"]}>
          <div className={styles["no-comments-box"]}>
            <img
              className={styles.image}
              src={noArticleComments}
              alt="추가 메뉴 클릭 이미지"
            />
          </div>
          <div className={styles["no-text-box"]}>
            <p className={styles["no-text"]}>아직 댓글이 없어요.</p>
            <p className={styles["no-text"]}>지금 댓글을 달아보세요!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {articleComments.map((comment) => (
        <div key={comment.id} className={styles.box}>
          <div className={styles["content-box"]}>
            {editingCommentId === comment.id ? (
              <div className={styles["update-input-box"]}>
                <textarea
                  className={styles["update-input"]}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className={styles["edit-button-box"]}>
                  <button
                    className={styles["cancel-button"]}
                    onClick={() => setEditingCommentId(null)}
                  >
                    취소
                  </button>
                  <button
                    className={styles["edit-button"]}
                    onClick={() =>
                      handleEditSave(comment.id, comment.writer.id)
                    }
                  >
                    수정 완료
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className={styles.title}>{comment.content}</p>
                <img
                  className={styles["dot-icon"]}
                  src={dotIcon}
                  alt="추가 메뉴"
                  onClick={() => toggleDropdown(comment.id)}
                />
                {activeDropdownId === comment.id && (
                  <div className={styles["dropdown-menu"]}>
                    <button
                      className={styles["dropdown-text"]}
                      onClick={() => handleEditClick(comment)}
                    >
                      수정하기
                    </button>
                    <button
                      className={styles["dropdown-text"]}
                      onClick={() =>
                        handleDeleteClick(comment.id, comment.writer.id)
                      }
                    >
                      삭제하기
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={styles["user-box"]}>
            <img
              className={styles.profile}
              src={profileBig}
              alt="프로필 이미지"
            />
            <div>
              <p>{comment.writer.nickname}</p>
              <p>{FormatDateAgo(comment.createdAt)}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArticleCommentInfo;
