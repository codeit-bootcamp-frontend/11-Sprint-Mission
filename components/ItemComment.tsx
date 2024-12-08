import { useEffect, useState } from 'react';
import axiosInstance from '@lib/axiosInstance';
import Profile from '@public/svgs/ic_profile.svg';
import EmptyComment from '@pubilc/svgs/Img_inquiry_empty.svg';
import '../style/ItemComment.css';
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
            <div className="comment-container" key={index}>
              <div className="comment-header">
                {comment.isEditing ? (
                  <textarea
                    className="comment-edit-content"
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
                    <div className="comment-content">{comment.content}</div>
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
              <div className="comment-info">
                <div className="comment-info-content">
                  {comment.writer.image ? (
                    <img className="profile-icon" src={comment.writer.image} />
                  ) : (
                    <Profile className="profile-icon" />
                  )}
                  <div className="comment-user-info">
                    <div className="comment-nickname">
                      {comment.writer.nickname}
                    </div>
                    <div className="comment-updatedAt">
                      {formatDate(comment.updatedAt)}
                    </div>
                  </div>
                </div>
                {comment.isEditing && (
                  <div className="comment-edit-actions">
                    <button
                      className="comment-edit-cancelbtn"
                      onClick={() => handleCancelEdit(index)}
                    >
                      취소
                    </button>
                    <button className="comment-edit-successbtn">
                      수정 완료
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="comment-empty">
          <EmptyComment className="comment-empty-icon" />
          <div className="comment-empty-content">아직 문의가 없어요</div>
        </div>
      )}
    </div>
  );
}

export default ItemComment;
