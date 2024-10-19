import { useEffect, useRef, useState } from "react";
import { Inner, CommentList } from "./Comments.style";
import { getComment } from "../../api";
import EditComment from "./EditComment";
import Comment from "./Comment";
import StyledReturnToList from "./ReturnToList.style";
import StyledNoInquiries from "./NoInquiries.style";

const Comments = ({ id }) => {
  const [commentList, setCommentList] = useState(null);
  const [toggledCommentId, setToggledCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [EditTextarea, setEditTextarea] = useState();

  const textareaRef = useRef(null);

  useEffect(() => {
    if (editingCommentId) {
      const textarea = textareaRef.current;
      textarea.focus();

      // 커서를 텍스트 맨 뒤로 이동
      textarea.selectionStart = textarea.value.length;
      textarea.selectionEnd = textarea.value.length;
    }
  }, [editingCommentId]);

  useEffect(() => {
    const commentLoad = async () => {
      const { list } = await getComment(id);
      setCommentList(list);
    };

    commentLoad();
  }, [id]);

  if (!commentList) return;

  const handleToggleClick = (commentId) => {
    setToggledCommentId(toggledCommentId === commentId ? null : commentId);
  };

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setToggledCommentId(null);
  };

  const onTextareaChange = (e) => {
    setEditTextarea(e.target.value);
  };

  return (
    <Inner>
      {commentList.length !== 0 ? (
        <CommentList>
          {commentList.map((comment) => {
            if (comment.id === editingCommentId) {
              return (
                <EditComment
                  comment={comment}
                  EditTextarea={EditTextarea}
                  onTextareaChange={onTextareaChange}
                  textareaRef={textareaRef}
                  handleCancelClick={handleCancelClick}
                />
              );
            }
            return (
              <Comment
                comment={comment}
                toggledCommentId={toggledCommentId}
                handleToggleClick={handleToggleClick}
                handleEditClick={handleEditClick}
              />
            );
          })}
        </CommentList>
      ) : (
        <StyledNoInquiries />
      )}

      <StyledReturnToList />
    </Inner>
  );
};

export default Comments;
