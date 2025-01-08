import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteProductById, getProductsById } from "../../api/api";
import CommentsList from "./CommentsList";
import "./DetailItem.css";
import UserInfo from "./UserInfo";
import TagList from "./TagList";
import QuestionForm from "./QuestionForm";
import FavoriteCount from "./FavoriteCount";
import moreMenu from "../../assets/image/Group 33735.png";
import arrow from "../../assets/image/Group 33736.png";
import panda from "../../assets/image/Group 33739.png";
import { useDispatch, useSelector } from "react-redux";
import { setProductInfo } from "../../redux/productSlice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";

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
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector((state: RootState) => state.productInfo);
  const user = useSelector((state: RootState) => state.userInfo.user);

  useEffect(() => {
    const fetchProductsById = async () => {
      try {
        setLoading(true);
        const result = await getProductsById(productId);
        dispatch(setProductInfo(result));
        setProduct(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsById();
  }, [productId]);

  const isDropdown = () => {
    setActiveDropdown((prev) => !prev);
  };

  const handleEditProduct = (writerId: number) => {
    if (writerId !== user.id) {
      toast.warning("본인이 등록한 물품만 수정할 수 있습니다.");
      return;
    }
    navigate(`/additem/${productId}`);
  };

  const handleDeleteProduct = async (productId: number, writerId: number) => {
    if (writerId !== user.id) {
      toast.warning("본인이 등록한 물품만 삭제할 수 있습니다.");
      return;
    }
    try {
      await deleteProductById(productId);
      toast.success("상품이 삭제되었습니다.");
      navigate("/items");
    } catch (error) {
      toast.error("상품 삭제 실패");
      console.error("상품 삭제 실패:", error);
    }
  };

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
            src={product.images[0] || panda}
            alt={product.images[0] ? product.name : "기본 이미지"}
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
                onClick={isDropdown}
              />
              {activeDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-text"
                    onClick={() => handleEditProduct(productDetail.ownerId)}
                  >
                    수정하기
                  </button>
                  <button
                    className="dropdown-text"
                    onClick={() =>
                      handleDeleteProduct(
                        productDetail.id,
                        productDetail.ownerId
                      )
                    }
                  >
                    삭제하기
                  </button>
                </div>
              )}
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
