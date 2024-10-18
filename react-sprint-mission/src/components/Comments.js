import React, { useCallback, useEffect, useState } from "react";
import {
  VerticalSelect,
  Textarea,
  Button,
  ImgPath,
  UserIconInfo,
} from "components/index";
import { getAxios } from "utils/api";
import styled from "styled-components";

function Comments({ id, limit = 10 }) {
  const [commentData, setCommentData] = useState({ list: [], nextCursor: 0 });
  const getComments = useCallback(async () => {
    const res = await getAxios({
      path: `${process.env.REACT_APP_API_URL}/${id}/comments`,
      params: { limit },
    });
    if (res.status === 200) {
      setCommentData(res.data);
    } else {
      alert("댓글 조회 오류!!");
    }
  }, [id, limit]);

  const handleSelectChagne = (value) => {
    console.log(value);
  };
  const handleInputChange = () => {};
  const handleItamSubmit = () => {};

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <>
      <h4>문의하기</h4>
      <Textarea
        id="itemDetailInput"
        className="inputBox textarea"
        type="textarea"
        placeholder="상품 소개를 입력해주세요"
        onChange={handleInputChange}
      />
      <div className="flexEnd">
        <Button className="itemSubmit" type="button" onClick={handleItamSubmit}>
          등록
        </Button>
      </div>
      <div>
        {commentData.list.map((comment, idx) => {
          return (
            <div key={idx}>
              <div className="spaceBetween">
                <CommentText>{comment.content}</CommentText>
                <VerticalSelect onChange={handleSelectChagne} />
              </div>
              <UserIconInfo
                image={comment.writer.image}
                nickname={comment.writer.nickname}
                desc={comment.updatedAt}
              />
              <div className="line" />
            </div>
          );
        })}
      </div>
      <Button className="goBackItemsButton">
        목록으로 돌아가기
        <img src={`${ImgPath("/common/ic_return.png")}`} alt="return" />
      </Button>
    </>
  );
}

const CommentText = styled.span`
  width: 90%;
  margin: 10px 0;
`;
export default Comments;
