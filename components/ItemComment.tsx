import { getProductComments, addComment, deleteComment } from "@/lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import plusBtn from "@/public/svgs/Group 33735 (1).svg";
import { Comment } from "@/types/commontypes";
import defaultImg from "@/public/svgs/Frame 2609463.svg";
import Image from "next/image";
import styles from "@/styles/itemcomment.module.css";

const timeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

  return `${diffInDays}일 전`;
};

export default function ItemComments() {
  const router = useRouter();
  const { productId } = router.query as { productId?: string };
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showMore, setShowMore] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!productId) return;
      try {
        const data = await getProductComments(productId);
        setComments(data.list);
        setLoading(false);
      } catch (err) {
        setError("댓글을 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleMoreClick = (commentId: number) => {
    setShowMore((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleAddComment = async () => {
    if (!productId || typeof productId !== "string") {
      alert("상품 ID가 없습니다.");
      return;
    }

    if (!inputValue.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await addComment(productId, inputValue); // 댓글 등록 API 호출
      alert("댓글이 등록되었습니다.");
      setInputValue("");
      const updatedComments = await getProductComments(productId);
      setComments(updatedComments.list);
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!productId || typeof productId !== "string") {
      alert("상품 ID가 없습니다.");
      return;
    }

    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(commentId); // 삭제 API 호출
        alert("댓글이 삭제되었습니다.");
        const updatedComments = await getProductComments(productId); // 삭제 후 댓글 목록 갱신
        setComments(updatedComments.list);
      } catch (error: any) {
        alert(error.message || "댓글 삭제 중 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  if (loading) return <div>댓글을 불러오는 중입니다...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.item_inquiry}>
      <div className={styles.item_inquiry_title}>문의하기</div>
      <textarea
        className={styles.item_inquiry_input}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className={styles.item_inquiry_button_container}>
        <button
          className={styles.item_inquiry_button}
          disabled={!inputValue}
          onClick={handleAddComment}
        >
          등록
        </button>
      </div>

      <div className={styles.item_comments_section}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={styles.comment_item}>
              <div className={styles.comment_content_container}>
                <div className={styles.comment_content}>{comment.content}</div>
                <div className={styles.comment_content_more}>
                  <Image
                    src={plusBtn}
                    className={styles.item_detail_more}
                    alt="더보기 아이콘"
                    onClick={() => handleMoreClick(comment.id)}
                  />
                  {showMore[comment.id] && (
                    <div className={styles.comment_actions}>
                      <button className={styles.comment_edit_button}>
                        수정하기
                      </button>
                      <button
                        className={styles.comment_delete_button}
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.comment_author_info}>
                <img
                  src={comment.writer.image || defaultImg.src}
                  alt="작성자 이미지"
                  className={styles.comment_author_image}
                />
                <div className={styles.comment_author_details}>
                  <div className={styles.comment_author_nickname}>
                    {comment.writer.nickname}{" "}
                  </div>
                  <div className={styles.comment_updated_at}>
                    {timeAgo(comment.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
