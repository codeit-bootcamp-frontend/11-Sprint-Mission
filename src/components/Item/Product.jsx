import {
  Inner,
  ProductContainer,
  ProductImg,
  ProductDetails,
  Title,
  ProductIntroduction,
  ProductTag,
  UserStats,
} from "./Product.style";

import { useState, useEffect } from "react";
import { getItem } from "../../api";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import Likes from "./Likes";
import TagList from "./TagList";

const Product = () => {
  const [item, setItem] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItem(id);
      setItem(data);
    };
    fetchData();
  }, [id]);

  if (!item) return;

  return (
    <Inner>
      <ProductContainer>
        <ProductImg>
          <img src={item.images[0]} alt="상품 이미지" />
        </ProductImg>

        <ProductDetails>
          <Title>
            <h2>{item.name}</h2>
            <p>{item.price.toLocaleString()}원</p>
          </Title>

          <ProductIntroduction>
            <h3>상품 소개</h3>
            <p>{item.description}</p>
          </ProductIntroduction>

          {item.tags.length > 0 && (
            <ProductTag>
              <h3>상품 태그</h3>
              <TagList item={item} />
            </ProductTag>
          )}

          <UserStats>
            <Profile />
            <Likes />
          </UserStats>
        </ProductDetails>
      </ProductContainer>
    </Inner>
  );
};

export default Product;
