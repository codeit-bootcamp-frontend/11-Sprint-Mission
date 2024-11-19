import { useState } from 'react';
import { Comment } from '../../types';

import RETURN_IMAGE from '/ic_back.svg';
import { StyledComentListContainer, IconReturn } from './ComentList.styles';

import Coment from './Coment';
import ComentEdit from './ComentEdit';
import NotResult from '../NotResult/NotResult';
import Button from '../Button/Button';
import Line from '../Shared/Line/Line';

interface ComentListProps {
  commentsList: Comment[];
  onEditSubmit: (item: Comment, updatedContent: string) => void;
  onDeleteClick: (commentId: string) => void;
  type: 'search' | 'inquiry' | 'comments';
}

function ComentList({
  commentsList,
  onEditSubmit,
  onDeleteClick,
  type,
}: ComentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleEditSubmit = (item: Comment, updatedContent: string) => {
    if (updatedContent.trim() !== '') {
      onEditSubmit(item, updatedContent);
      setEditingCommentId(null);
    }
  };

  return (
    <StyledComentListContainer>
      {commentsList.length > 0 ? (
        <ul className='coment-list'>
          {commentsList.map((item) => (
            <li key={item.id} className='coment-item'>
              {editingCommentId === item.id ? (
                <ComentEdit
                  item={item}
                  onCancel={handleCancelEdit}
                  onSubmit={(updatedContent) =>
                    handleEditSubmit(item, updatedContent)
                  }
                />
              ) : (
                <Coment
                  name={item.writer.nickname}
                  date={item.createdAt}
                  content={item.content}
                  onClickEdit={() => handleEditClick(item.id)}
                  onClickDelete={() => onDeleteClick(item.id)}
                />
              )}
              <Line />
            </li>
          ))}
        </ul>
      ) : (
        <NotResult type={type} />
      )}
      <Button href='/items' color='blue' round>
        목록으로 돌아가기
        <IconReturn src={RETURN_IMAGE} alt='' />
      </Button>
    </StyledComentListContainer>
  );
}

export default ComentList;
