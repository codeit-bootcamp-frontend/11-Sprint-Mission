import { Link } from "react-router-dom";
import { Inner, CommentList, BackButton, NoInquiries } from "./Comments.style";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import { getComment } from "../../api";
import EditDeleteToggle from "./EditDeleteToggle";

const Comments = ({ id }) => {
  const [commentList, setCommentList] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const commentLoad = async () => {
      const { list } = await getComment(id);
      setCommentList(list);
    };

    commentLoad();
  }, [id]);

  if (!commentList) return;

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Inner>
      {commentList.length !== 0 ? (
        <CommentList>
          {commentList.map((comment) => {
            return (
              <li key={comment.id}>
                <div className="comment">
                  {/* <textarea value={comment.content}></textarea> */}
                  <p>{comment.content}</p>

                  <EditDeleteToggle isActive={isActive} onClick={onClick} />
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
        <Link to="/Items">목록으로 돌아가기</Link>
      </BackButton>
    </Inner>
  );
};

export default Comments;
