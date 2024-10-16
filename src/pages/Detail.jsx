import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "utils/api";
import DetailProduct from "components/detail/DetailProduct";

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
    </div>
  );
}

export default Detail;
