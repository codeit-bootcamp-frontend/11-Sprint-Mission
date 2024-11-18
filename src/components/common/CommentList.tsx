import "../css/CommentList.css";
import kebab from "../../images/icon/ic_kebab.svg";
import myprofile from "../../images/icon/myprofile.svg";
import React, { MouseEvent, useState } from "react";
import Textarea from "./TextArea";
import Button from "./Button";
import icback from "../../images/icon/ic_back.svg";
import { Link } from "react-router-dom";
import inquiryEmpty from "../../images/Img_inquiry_empty.png";

interface CommentProps {
  comment: CommentPr;
  onClickOption: (e: MouseEvent, id: number | null) => void;
  edit: boolean;
}

export interface CommentPr {
  writer: {
    image: string | null;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

const Comment = ({ comment, onClickOption, edit = false }: CommentProps) => {
  const { id, content, writer, createdAt } = comment;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleClickOption = (e: MouseEvent<HTMLDivElement>, id: number) => {
    setIsOpenDropdown((prev) => !prev);
    onClickOption(e, id);
  };

  const handleClickModify = (e: MouseEvent<HTMLDivElement>) => {
    onClickOption(e, null);
  };

  return (
    <div key={comment.id}>
      <div>
        <div className="comment-area">
          <div className="comment-area__content">
            {edit ? (
              <Textarea value={content}></Textarea>
            ) : (
              <>
                <div>{content}</div>
                <img
                  src={kebab}
                  alt="댓글수정삭제버튼"
                  onClick={toggleDropdown}
                ></img>
              </>
            )}
            {isOpenDropdown && (
              <div className="comment-area__dropdown">
                <div className="top" onClick={(e) => handleClickOption(e, id)}>
                  수정하기
                </div>
                <div className="bottom">삭제하기</div>
              </div>
            )}
          </div>
          <div className="comment-area__profilearea">
            <div className="comment-area__profile">
              <img src={myprofile} alt="프로필이미지" width="32px"></img>
              <div>
                <div className="name">{writer.nickname}</div>
                <div className="time">{createdAt}</div>
              </div>
            </div>
            {edit && (
              <div className="comment-area__profile__buttons">
                <div className="cancle" onClick={handleClickModify}>
                  취소
                </div>
                <Button className="btn btn-primary">수정완료</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommentListProps {
  commentList: CommentPr[];
  onClickOption: (e: React.MouseEvent, id: number | null) => void;
  editingId?: number;
}
const CommentList = ({
  commentList,
  onClickOption,
  editingId,
}: CommentListProps) => {
  return (
    <div className="comment-list">
      {commentList.length > 0 ? (
        commentList.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onClickOption={onClickOption}
            edit={comment.id === editingId} // 필요시 edit 상태 전달
          />
        ))
      ) : (
        <div className="comment-list__empty">
          <img className="image-logo" src={inquiryEmpty} alt="판다마켓로고" />
          <p className="comment-list__text">아직 문의가 없어요</p>
        </div>
      )}
      <div className="comment-list_bottom">
        <Link className="btn btn-primary-round-xl" to="/">
          목록으로 돌아가기 <img src={icback} alt="목록으로돌아가기"></img>
        </Link>
      </div>
    </div>
  );
};

export default CommentList;
