import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailPages.css";
import Category from "../components/Category";
import myprofile from "../images/icon/myprofile.svg";
import { getProductComment, getProductDetail } from "../api/api";
import heart from "../images/icon/heart.svg";
import CommentList from "../components/CommentList";
import TextArea from "../components/TextArea";
import Button from "../components/Button";

const DetailPages = () => {
  const data = useParams();

  const [detailData, setDetailData] = useState();
  const [commentList, setCommentList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [comment, setComment] = useState("");

  const handleLoadData = useCallback(async () => {
    let result, result2;

    const params = {
      productId: data.id,
    };

    const params2 = {
      productId: data.id,
      limit: 3,
    };
    result = await getProductDetail(params);
    result2 = await getProductComment(params2);
    setDetailData(result);
    setCommentList(result2.list);
  }, [data.id]);

  const handleClickOption = (e, editId) => {
    setEditingId(editId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // 입력값 상태 업데이트
  };

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return (
    <>
      <div className="main-content-dt">
        <div className="detail-box">
          <img
            src={detailData?.images[0]}
            alt="상품상제정보 이미지"
            className="detail-box-image"
          />
          <div className="detail-box-content">
            <div className="detail-box-title">
              <div className="name">{detailData?.name}</div>
              <div className="price">{detailData?.price + " 원"}</div>
            </div>
            <div className="detail-box-info">
              <div>
                <div className="info">상품 소개</div>
                <div className="info-detail">{detailData?.description}</div>
              </div>
              <div>
                <div className="info">상품 태그</div>
                <Category
                  categoryData={detailData?.tags}
                  isShowCancleBtn={false}
                />
              </div>
            </div>
            <div className="detail-box__profilebox">
              <div className="detail-box__profile">
                <img
                  alt="판매자프로필이미지"
                  src={myprofile}
                  width={"40px"}
                  height={"40px"}
                />
                <div>
                  <div className="name">{detailData?.ownerNickname}</div>
                  <div className="time">{detailData?.createdAt}</div>
                </div>
              </div>
              <div className="detail-box__heartbox">
                <div></div>
                <img src={heart} alt="즐겨찾기" width={32} height={32} />
                {detailData?.favoriteCount}
              </div>
            </div>
          </div>
        </div>
        <div className="detail-regist-box">
          <TextArea
            id="comment"
            label="문의하기"
            // value={comment}
            onChange={handleCommentChange}
            placeholder={
              "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            }
          />
          <div className="detail-regist-box__btn">
            <Button className={comment ? "btn btn-primary" : "btn btn-gray"}>
              등록
            </Button>
          </div>
        </div>
        <CommentList
          commentList={commentList}
          onClickOption={handleClickOption}
          editingId={editingId}
        />
      </div>
    </>
  );
};

export default DetailPages;
