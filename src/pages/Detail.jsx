import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchProductById, fetchInquiryById, postComment } from "utils/api";
import DetailProduct from "components/detail/DetailProduct";
import PrimaryButton from "components/common/PrimaryButton";
import DetailInquiry from "components/detail/DetailInquiry";
import InquiryEmpty from "components/detail/InquiryEmpty";
import Header from "components/common/Header";

const INITIAL_DETAILS = {
  name: "",
  description: "",
  images: [],
  price: 0,
  favoriteCount: 0,
  tags: [],
  ownerNickname: "",
  updatedAt: "",
};

const INITIAL_COMMENTS = { list: [], nextCursor: null };

function Detail() {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [product, setProduct] = useState(INITIAL_DETAILS);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const {
    name,
    description,
    images,
    price,
    favoriteCount,
    tags,
    ownerNickname,
    updatedAt,
    isFavorite,
  } = product;
  const { list, nextCursor } = comments;
  const endRef = useRef(null);

  const loadProductById = (id) => {
    fetchProductById(id).then((response) => {
      setProduct(response);
    });
  };

  const loadInquiryById = (id, nextCursor = null) => {
    fetchInquiryById(id, nextCursor).then(({ list, nextCursor }) => {
      setComments((prev) => ({
        list: [...prev.list, ...list],
        nextCursor,
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(id, { content: newComment }); // Jwt Token 추가 예정
    setNewComment("");
  };

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && nextCursor) {
        loadInquiryById(id, nextCursor);
      }
    },
    [id, nextCursor]
  );

  useEffect(() => {
    loadProductById(id);
    loadInquiryById(id);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    const current = endRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);
  return (
    <>
      <Header isLogin />
      <div className="page-detail">
        <DetailProduct
          images={images}
          name={name}
          price={price}
          description={description}
          tags={tags}
          favoriteCount={favoriteCount}
          ownerNickname={ownerNickname}
          isFavorite={isFavorite}
          updatedAt={updatedAt}
        />
        <div className="product-inquiry-wrap">
          <form onSubmit={handleSubmit}>
            <label htmlFor="input_inquiry">문의하기</label>
            <textarea
              id="input_inquiry"
              value={newComment}
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              onChange={({ target }) => setNewComment(target.value)}
            />
            <PrimaryButton type="submit" name="btn-add" disabled={!newComment}>
              등록
            </PrimaryButton>
          </form>
          {list.length > 0 ? (
            list.map(({ id, content, writer, updatedAt }) => (
              <DetailInquiry
                key={`comment_${id}`}
                id={id}
                content={content}
                writer={writer}
                updatedAt={updatedAt}
              />
            ))
          ) : (
            <InquiryEmpty />
          )}
        </div>
        {nextCursor && <div className="end-point" ref={endRef} />}
        <NavLink to="/items" className="navigate-to-items">
          목록으로 돌아가기
          <img src="/images/icons/ic_back.svg" alt="목록으로 돌아가기" />
        </NavLink>
      </div>
    </>
  );
}

export default Detail;
