import Image from "components/common/Image";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "utils/api";

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

  useEffect(() => {
    loadProductById(id);
  }, [id]);
  return (
    <div className="page-detail">
      <div className="product-detail-contents">
        <Image images={images} name={name} />
        <div className="desc-wrap">
          <h2 className="detail-name">{name}</h2>
          <div className="detail-price">{price}</div>
          <p className="detail-description">{description}</p>
          <div className="detail-tag-wrap">
            <div className="detail-tag-title">상품 태그</div>
            {tags.map((tag) => (
              <span className="detail-tag">{tag}</span>
            ))}
          </div>
          <div className="detail-footer">
            <div className="owner-wrap">
              <div className="owner-icon">
                <img
                  src="/images/icons/ic_user_login.svg"
                  alt={ownerNickname}
                />
              </div>
              <div className="owner-desc">
                <div className="owner-name">{ownerNickname}</div>
                <div className="date-update">{updatedAt}</div>
              </div>
            </div>
            <button className="btn-favorite">
              <img
                src={`/images/icons/ic_favorite${
                  isFavorite ? "_active" : ""
                }.svg`}
                alt="favorite"
              />
              <span>{favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
