import { useEffect, useState } from 'react';
import axiosInstance from '@lib/axiosInstance';
import Profile from '@public/svgs/ic_profile.svg';
import EmptyComment from '@pubilc/svgs/Img_inquiry_empty.svg';
import styles from '@style/ItemComment.module.css';
import DropdownMenu from '@components/DropdownMenu';
import { Product } from '@components/types/productTypes';

interface Comment {
  id: number;
  content: string;
  writer: {
    nickname: string;
    image?: string;
  };
  updatedAt: string;
  isEditing: boolean;
  originalContent: string;
}

interface ItemCommentProps {
  item: Product;
}

function ItemComment({ item }: ItemCommentProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/products/${item.id}/comments`,
          {
            params: {
              limit: 10,
            },
          },
        );
        console.log(response.data.list);
        // 각 댓글에 isEditing 및 originalContent 상태 추가
        const commentsWithEditState: Comment[] = response.data.list.map(
          (comment: Comment) => ({
            ...comment,
            isEditing: false,
            originalContent: comment.content, // 원본 내용을 저장
          }),
        );
        setComments(commentsWithEditState);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      .slice(0, -1); // 공백 제거
  };

  // 수정하기 버튼 클릭 시: isEditing을 true로 하고 원본 content 저장
  const handleEditClick = (index: number) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index
          ? { ...comment, isEditing: true, originalContent: comment.content }
          : comment,
      ),
    );
  };

  // 수정 취소 버튼 클릭 시: 원본 content로 복구
  const handleCancelEdit = (index: number) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index
          ? { ...comment, isEditing: false, content: comment.originalContent }
          : comment,
      ),
    );
  };

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment, index) => (
            <div className={styles['comment-container']} key={index}>
              <div className={styles['comment-header']}>
                {comment.isEditing ? (
                  <textarea
                    className={styles['comment-edit-content']}
                    value={comment.content}
                    onChange={(e) =>
                      setComments((prevComments) =>
                        prevComments.map((c, i) =>
                          i === index ? { ...c, content: e.target.value } : c,
                        ),
                      )
                    }
                  />
                ) : (
                  <>
                    <div className={styles['comment-content']}>
                      {comment.content}
                    </div>
                    <DropdownMenu
                      onSelection={(action: string) => {
                        if (action === 'fixed') {
                          handleEditClick(index);
                        }
                        if (action === 'delete') {
                          console.log('Delete action triggered');
                        }
                      }}
                    />
                  </>
                )}
              </div>
              <div className={styles['comment-info']}>
                <div className={styles['comment-info-content']}>
                  {comment.writer.image ? (
                    <img
                      className={styles['profile-icon']}
                      src={comment.writer.image}
                    />
                  ) : (
                    <Profile className={styles['profile-icon']} />
                  )}
                  <div className={styles['comment-user-info']}>
                    <div className={styles['comment-nickname']}>
                      {comment.writer.nickname}
                    </div>
                    <div className={styles['comment-updatedAt']}>
                      {formatDate(comment.updatedAt)}
                    </div>
                  </div>
                </div>
                {comment.isEditing && (
                  <div className={styles['comment-edit-actions']}>
                    <button
                      className={styles['comment-edit-cancelbtn']}
                      onClick={() => handleCancelEdit(index)}
                    >
                      취소
                    </button>
                    <button className={styles['comment-edit-successbtn']}>
                      수정 완료
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles['comment-empty']}>
          <EmptyComment className={styles['comment-empty-icon']} />
          <div className={styles['comment-empty-content']}>
            아직 문의가 없어요
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemComment;
