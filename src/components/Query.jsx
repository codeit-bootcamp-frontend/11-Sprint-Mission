import "./Query.css";
import { useEffect, useState, useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getComments } from "../util/api";

import Btn from "./Button/Btn";
import UserInfo from "./UserInfo";
import Kebab from "../assets/icons/ic_kebab.svg";
import nonQuery from "../assets/inquiry_empty.svg";
import { timeAgo } from "../util/timeAgo";

const commentsReducer = (comments, action) => {
  switch (action.type) {
    case "add": {
      return [...comments, ...action.comments];
    }
    case "save": {
      return comments.map((comment) =>
        comment.id === action.comment.id ? action.comment : comment
      );
    }
    case "delete": {
      return comments.filter((comment) => comment.id !== action.commentId);
    }

    default: {
      throw Error("알 수 없는 type" + action.type);
    }
  }
};

function Query({ id }) {
  const nav = useNavigate();
  const [text, setText] = useState(""); // textarea 상태 관리
  const [cursor, setCursor] = useState();
  const [comments, dispatch] = useReducer(commentsReducer, []);
  const nextId = useRef(comments.length);

  //add
  const handleAddComment = (text) => {
    dispatch({
      type: "add",
      id: nextId.current++,
      text: text,
    });
  };

  //save
  const handleChangeComment = (comment) => {
    dispatch({
      type: "save",
      comment: comment,
    });
  };

  //delete
  const hadeleDeleteComment = (commentId) => {
    dispatch({
      type: "delete",
      commentId: commentId,
    });
  };

  useEffect(() => {
    let result;
    const fetchComments = async () => {
      try {
        result = await getComments({ id });

        if (result.nextCursor) {
          setCursor(result.nextCursor);
        }

        dispatch({
          type: "add",
          comments: result.list,
        });
        console.log(result.list); // 불러온 댓글 로그 출력
      } catch (e) {
        console.error("댓글을 가져오는 중 오류 발생", e);
      }
    };
    fetchComments();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log([...comments]);
  };

  return (
    <div className="Query">
      {comments.length > 0 ? (
        <>
          <div className="Query__formContainer">
            <form className="Query__form" onSubmit={handleSubmit}>
              <h4 className="Query__title">문의하기</h4>
              <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="Query__textarea"
                placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              />
            </form>
            <div className="Query__btnContainer">
              <Btn
                text={"등록"}
                status={text.trim() ? "active" : "inactive"}
                type={"submit"}
              />
            </div>
          </div>

          <section>
            {comments.map((comment) => (
              <div className="Query__commentContainer" key={comment.id}>
                <div className="Query__commentWrapper">
                  <p className="Query__comment">{comment.content}</p>
                  <UserInfo
                    image={comment.writer.image}
                    nickname={comment.writer.nickname}
                    time={timeAgo(comment.updatedAt)}
                    type={"small"}
                  />
                </div>
                <img src={Kebab} alt="kebab" />
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="Query__nonQuery">
          <img src={nonQuery} alt="nonQuery" className="Query__nonQueryImg" />
          <p className="Query__nonQueryText">아직 문의가 없어요</p>
        </div>
      )}
      <div className="Query__btn">
        <Btn
          text={"목록으로 돌아가기"}
          status={"active"}
          size={"medium"}
          onClick={() => nav("/items")}
        />
      </div>
    </div>
  );
}

export default Query;
