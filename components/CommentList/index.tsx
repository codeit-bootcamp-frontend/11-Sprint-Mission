import { Comments, Comment } from '@/types/comment.type';
import formatDate from '@/lib/formatDate';

import styles from './Comment.module.css';
import BaseAvatar from '@/public/images/common/base-avatar.svg';
import IconComment from '@/public/images/boards/ico-comment.svg';

/**
 * 댓글 아이템 컴포넌트
 * @param {Comment} comment - 댓글
 * @returns {JSX.Element} 댓글 아이템 컴포넌트
 */
const CommentItem = ({ writer, content, updatedAt }: Comment) => (
  <li className={styles.item}>
    <p className={styles.content}>{content}</p>
    <div className="flex gap-2">
      <BaseAvatar src={writer.image} alt={writer.nickname} className="size-8" />
      <div className="flex flex-col gap-1">
        <span className={styles.name}>{writer.nickname}</span>
        <span className={styles.date}>{formatDate(updatedAt)}</span>
      </div>
    </div>
  </li>
);

/**
 * 댓글이 없음 컴포넌트
 * @returns {JSX.Element} 댓글이 없음 컴포넌트
 */
const EmptyComment = () => (
  <li className={styles.empty}>
    <IconComment />
    <p>아직 댓글이 없습니다.</p>
  </li>
);

/**
 * 댓글 목록 컴포넌트
 * @param {Comments} comments - 댓글 목록
 * @returns {JSX.Element} 댓글 목록 컴포넌트
 */
const CommentList = ({ comments }: { comments: Comments }) => (
  <ul className={styles.list}>
    {comments.list.length === 0 ? (
      <EmptyComment />
    ) : (
      comments.list.map((comment) => <CommentItem key={comment.id} {...comment} />)
    )}
  </ul>
);

export default CommentList;
