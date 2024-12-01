import { Comments, Comment } from '@/types/comment.type';
import formatDate from '@/lib/formatDate';
//
import styles from './Comment.module.css';
import BaseAvatar from '@/public/images/common/base-avatar.svg';
import IconComment from '@/public/images/boards/ico-comment.svg';

interface Props {
  comments: Comments;
}

export default function CommentList({ comments }: Props) {
  return (
    <ul className={styles.list}>
      {comments.list.length === 0 && (
        <li className={styles.empty}>
          <IconComment />
          <p>아직 댓글이 없습니다.</p>
        </li>
      )}

      {comments.list.map(({ id, writer, content, updatedAt }: Comment) => (
        <li key={id}>
          <p className={styles.content}>{content}</p>
          <div className="flex gap-2">
            <BaseAvatar className="size-8" />
            <div className="flex flex-col gap-1">
              <span className={styles.name}>{writer.nickname}</span>
              <span className={styles.date}>{formatDate(updatedAt)}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
