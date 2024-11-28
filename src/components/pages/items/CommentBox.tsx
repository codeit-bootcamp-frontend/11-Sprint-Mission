import { useState } from 'react';
import { getTimeDifference } from '@utills';
import { updateCommentById } from '@api/commentsApi';
import { DEFAULT_PROFILE_IMAGE } from '@constant';
import KebabMenu from './KebabMenu';
import './CommentBox.css';

interface CommentBoxProps {
  comment: {
    content: string;
    createdAt: string;
    writer?: { image: string; nickname: string };
    id: number;
  };
  onDelete: (id: number) => void;
}

function CommentBox({ comment, onDelete }: CommentBoxProps) {
  let { content, createdAt, writer, id } = comment;
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState(content);

  const handleOpenEditForm = () => {
    setIsEdit(true);
  };

  const handleCloseEditForm = () => {
    setIsEdit(false);
  };

  const handleCompleteEdit = async () => {
    try {
      await updateCommentById(id, editInput);
      content = editInput;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred:', error);
      }
    }
  };

  return (
    <div className='comment-box'>
      {isEdit ? (
        <textarea
          className='comment-edit-textarea'
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
      ) : (
        <div className='comment-content-wrapper'>
          <p className='comment-content'>{content}</p>
          <KebabMenu
            openEdit={handleOpenEditForm}
            onDelete={onDelete}
            id={id}
          />
        </div>
      )}

      <div className='comment-writer-container'>
        <img
          className='comment-writer-image'
          src={writer?.image || DEFAULT_PROFILE_IMAGE}
          alt='댓글 작성자 프로필 이미지'
        />
        <div className='comment-edit-btn-wrapper'>
          <div className='comment-writer-wrapper'>
            <p className='comment-writer-nickname'>{writer?.nickname}</p>
            <p className='comment-writer-createdat'>
              {getTimeDifference(createdAt)}
            </p>
          </div>
          {isEdit && (
            <div className='comment-edit-btn'>
              <button
                className='comment-edit-cancle-btn'
                onClick={handleCloseEditForm}
              >
                취소
              </button>
              <button
                className='comment-edit-complete-btn'
                disabled={editInput === content}
                onClick={handleCompleteEdit}
              >
                수정 완료
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentBox;
