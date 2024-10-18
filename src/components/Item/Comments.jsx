import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Inner,
  CommentList,
  BackButton,
  NoInquiries,
  Edit,
} from "./Comments.style";
import { getComment } from "../../api";
import Profile from "./Profile";

const Comments = ({ id }) => {
  const [commentList, setCommentList] = useState(null);
  const [toggledCommentId, setToggledCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [EditTextarea, setEditTextarea] = useState();

  useEffect(() => {
    const commentLoad = async () => {
      const { list } = await getComment(id);
      setCommentList(list);
    };

    commentLoad();
  }, [id]);

  if (!commentList) return;

  const handleToggleClick = (commentId) => {
    setToggledCommentId(toggledCommentId == commentId ? null : commentId);
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
            if (comment.id == editingCommentId) {
              return (
                <Edit key={comment.id}>
                  <div className="comment">
                    <textarea value={EditTextarea} onChange={onTextareaChange}>
                      {comment.content}
                    </textarea>
                  </div>

                  <div>
                    <Profile
                      nickname={comment.writer.nickname}
                      createdAt={comment.createdAt}
                    />

                    <div className="btnWrapper">
                      <button className="cancelBtn" onClick={handleCancelClick}>
                        취소
                      </button>
                      <button className="editBtn">수정 완료</button>
                    </div>
                  </div>
                </Edit>
              );
            }
            return (
              <li key={comment.id}>
                <div className="comment">
                  <p>{comment.content}</p>

                  <>
                    <button
                      onClick={() => handleToggleClick(comment.id)}
                    ></button>

                    <ul
                      className={`EditDelete__toggle ${
                        toggledCommentId == comment.id ? "active" : ""
                      }`}
                    >
                      <li>
                        <button onClick={() => handleEditClick(comment.id)}>
                          수정하기
                        </button>
                      </li>

                      <li>
                        <button>삭제하기</button>
                      </li>
                    </ul>
                  </>
                </div>

                <Profile
                  nickname={comment.writer.nickname}
                  createdAt={comment.createdAt}
                />
              </li>
            );
          })}
        </CommentList>
      ) : (
        <NoInquiries>아직 문의가 없어요</NoInquiries>
      )}

      <BackButton>
        <Link to="/items">목록으로 돌아가기</Link>
      </BackButton>
    </Inner>
  );
};

export default Comments;
