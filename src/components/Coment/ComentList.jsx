import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getProductsDetailComments } from '../../services/products-api';
import useAsyncRequest from '../../hooks/useAsyncRequest';

import RETURN_IMAGE from '../../assets/ic_back.svg';
import { StyledComentListContainer, IconReturn } from './ComentList.styles';

import Coment from './Coment';
import ComentEdit from './ComentEdit';
import NotResult from '../NotResult/NotResult';
import Button from '../Button/Button';
import Line from '../Line/Line';

function ComentList({ type }) {
  const [commentsList, setCommentsList] = useState([]);
  const { execute } = useAsyncRequest();
  const { productId } = useParams();
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const handleCommentsListLoad = async () => {
      const result = await execute(() => getProductsDetailComments(productId));
      const { list } = result;
      if (result) {
        setCommentsList(list);
      }
    };

    handleCommentsListLoad();
  }, [productId, execute]);

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const handleEditSubmit = (item, updatedContent) => {
    if (updatedContent.trim() !== '') {
      setCommentsList((prevItems) =>
        prevItems.map((comment) =>
          comment.id === item.id
            ? { ...comment, content: updatedContent }
            : comment,
        ),
      );
      setEditingCommentId(null);
    }
  };

  const handleDeleteClick = (itemToDeleteId) => {
    setCommentsList((prevItems) =>
      prevItems.filter((item) => item.id !== itemToDeleteId),
    );
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
                  onClickDelete={() => handleDeleteClick(item.id)}
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
