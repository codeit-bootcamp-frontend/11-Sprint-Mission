import { useState } from 'react';
import styled from 'styled-components';
import { media } from '@/styles/media.styles';
import { flexColumn } from '@/styles/layout.styles';

const RETURN_IMAGE = '/ic_back.svg';

import { CommentType } from '@/types/types';

import Comment from './Comment';
import CommentEdit from './CommentEdit';
import NotResult from '../NotResult';
import Button from '../Button';
import Line from '../Line';

interface CommentListProps {
  commentsList: CommentType[];
  onEditSubmit: (item: CommentType, updatedContent: string) => void;
  onDeleteClick: (commentId: string) => void;
  type: 'search' | 'inquiry' | 'comments';
}

function CommentList({ commentsList, onEditSubmit, onDeleteClick, type }: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleEditClick = (commentId: string) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleEditSubmit = (item: CommentType, updatedContent: string) => {
    if (updatedContent.trim() !== '') {
      onEditSubmit(item, updatedContent);
      setEditingCommentId(null);
    }
  };

  return (
    <StyledCommentListContainer>
      {commentsList.length > 0 ? (
        <ul className='coment-list'>
          {commentsList.map((item) => (
            <li key={item.id} className='coment-item'>
              {editingCommentId === item.id ? (
                <CommentEdit
                  item={item}
                  onCancel={handleCancelEdit}
                  onSubmit={(updatedContent) => handleEditSubmit(item, updatedContent)}
                />
              ) : (
                <Comment
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
    </StyledCommentListContainer>
  );
}

export default CommentList;

const StyledCommentListContainer = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  gap: 6.4rem;
  width: 100%;
  ${media.ta`
    gap: 5.6rem;
  `}
  ${media.mo`
    gap: 4rem;
  `}
  .coment {
    &-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      ${media.mo`
      gap: 1.6rem;
      `}
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
  }
`;

const IconReturn = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
