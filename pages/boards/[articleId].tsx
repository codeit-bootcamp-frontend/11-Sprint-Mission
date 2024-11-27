import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { getArticleById, getArticleComment } from "@/lib/api";
import { Article, Comment } from "@/types/commontypes";
import styles from "@/styles/articleId.module.css";
import heart from "@/public/svgs/ic_heart (1).svg";
import profileImg from "@/public/svgs/Frame 2609463.svg";
import plusBtn from "@/public/svgs/Group 33735 (1).svg";

export default function ArticlePage() {
  const router = useRouter();
  const { articleId } = router.query;

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // 게시글 데이터 가져오기
  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const data = await getArticleById(Number(articleId));
        setArticle(data);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  // 댓글 데이터 가져오기
  const fetchComments = async () => {
    if (!articleId || isLoadingComments) return;

    try {
      setIsLoadingComments(true);
      const { list, nextCursor: newCursor } = await getArticleComment(
        Number(articleId),
        nextCursor
      );
      setComments((prev) => [...prev, ...list]);
      setNextCursor(newCursor);
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  if (!article) return <p>로딩 중...</p>;

  return (
    <div className={styles.article_container}>
      <div className={styles.article_container_top}>
        <div className={styles.article_top}>
          <h1 className={styles.article_title}>{article.title}</h1>
          <Image src={plusBtn} alt="더보기 버튼" width={3} height={13} />
        </div>
        <div className={styles.article_profile}>
          <div className={styles.article_profile_front}>
            <Image src={profileImg} alt="프로필이미지" width={40} height={40} />
            <div className={styles.article_writer}>
              {article.writer.nickname}
            </div>
            <div className={styles.article_date}>
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className={styles.article_like}>
            <Image src={heart} alt="하트" width={32} height={32} />
            {article.likeCount}
          </div>
        </div>

        <p className={styles.article_content}>{article.content}</p>
      </div>

      <div className={styles.article_leave_comment}>
        <div className={styles.article_comment_title}>댓글달기</div>
        <textarea
          className={styles.article_comment_input}
          placeholder="댓글을 입력해주세요."
        />
        <button className={styles.btn}>등록</button>
      </div>

      <div className={styles.article_container_bottom}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <div className={styles.content_container}>
                <p className={styles.content}>{comment.content}</p>
                <Image src={plusBtn} alt="더보기 버튼" width={3} height={13} />
              </div>
              <div className={styles.profile}>
                <Image
                  src={comment.writer.image || profileImg}
                  alt={`${comment.writer.nickname}의 프로필`}
                  width={32}
                  height={32}
                />
                <div>
                  <div className={styles.writer_nickname}>
                    {comment.writer.nickname}
                  </div>
                  <div className={styles.comment_date}>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
        {isLoadingComments && <p>댓글 로딩 중...</p>}
        {nextCursor && !isLoadingComments && (
          <button onClick={fetchComments} style={{ marginTop: "1rem" }}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
