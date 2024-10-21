import Profile from "./Profile";

const Comment = ({
  comment,
  toggledCommentId,
  handleToggleClick,
  handleEditClick,
}) => {
  return (
    <li key={comment.id}>
      <div className="comment">
        <p>{comment.content}</p>

        <>
          <button onClick={() => handleToggleClick(comment.id)}></button>

          <ul
            className={`EditDelete__toggle ${
              toggledCommentId === comment.id ? "active" : ""
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
        updatedAt={comment.updatedAt}
      />
    </li>
  );
};

export default Comment;
