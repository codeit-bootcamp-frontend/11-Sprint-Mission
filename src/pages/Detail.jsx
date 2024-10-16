import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchInquiryById } from "utils/api";
import DetailProduct from "components/detail/DetailProduct";
import PrimaryButton from "components/common/PrimaryButton";
import DetailInquiry from "components/detail/DetailInquiry";

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

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(INITIAL_DETAILS);
  const [comments, setComments] = useState([]);
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

  const loadProductById = (id) => {
    fetchProductById(id).then((response) => {
      setProduct(response);
    });
  };

  const loadInquiryById = (id) => {
    fetchInquiryById(id).then(({ list }) => {
      setComments(list);
    });
  };

  useEffect(() => {
    loadProductById(id);
    loadInquiryById(id);
  }, [id]);
  return (
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
        <form>
          <label htmlFor="input_inquiry">문의하기</label>
          <textarea
            id="input_inquiry"
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <PrimaryButton type="submit" name="btn-add">
            등록
          </PrimaryButton>
        </form>
        {comments.length > 0 ? (
          comments.map(({ id, content, writer }) => (
            <DetailInquiry
              key={`comment_${id}`}
              content={content}
              writer={writer}
            />
          ))
        ) : (
          <div>아직 문의가 없어요</div>
        )}
      </div>
    </div>
  );
}

export default Detail;
