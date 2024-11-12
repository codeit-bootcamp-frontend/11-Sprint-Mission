import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsById } from "../../api/api";
import CommentsList from "./CommentsList";
import "./DetailItem.css";
import UserInfo from "./UserInfo";
import TagList from "./TagList";
import QuestionForm from "./QuestionForm";
import FavoriteCount from "./FavoriteCount";
import moreMenu from "../../assets/image/Group 33735.png";
import arrow from "../../assets/image/Group 33736.png";

interface Product {
  createdAt: Date;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

const DetailItem = () => {
  const { productId } = useParams<{ productId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        setLoading(true);
        const result = await getProductsById(productId);
        setProduct(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsById();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="detailItem-container">
      <section className="detailItem-box">
        <div className="deatilItem-image-box">
          <img
            className="deatilItem-image"
            src={product.images[0]}
            alt={product.name}
          />
        </div>
        <div className="detailItem-content-box">
          <div className="detailItem-header-content">
            <div className="detailItem-header">
              <h1 className="detailItem-name">{product.name}</h1>
              <img
                className="detailItem-menu"
                src={moreMenu}
                alt="메뉴 더보기 버튼"
              />
            </div>
            <p className="detailItem-price">{product.price}원</p>
          </div>
          <p className="deatilItem-introduce">상품 소개</p>
          <p className="detailItem-description">{product.description}</p>
          <p className="deatilItem-introduce">상품 태그</p>
          <TagList tags={product.tags} />
          <div className="user-container">
            <UserInfo
              ownerNickname={product.ownerNickname}
              createdAt={product.createdAt}
            />
            <FavoriteCount count={product.favoriteCount} />
          </div>
        </div>
      </section>
      <QuestionForm />
      <CommentsList />
      <Link to="/items" className="back-button-link">
        <button className="back-button">
          <p className="back-button-text">목록으로 돌아가기</p>
          <img className="button-arrow" src={arrow} alt="돌아가는 화살표"></img>
        </button>
      </Link>
    </div>
  );
};

export default DetailItem;
