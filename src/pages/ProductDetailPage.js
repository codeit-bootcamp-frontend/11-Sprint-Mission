import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getDetail, getDetailComment } from "../api/api";
import { ReactComponent as HeartIcon } from "../images/ic_heart.svg";
import DetailComment from "../component/DetailComment";
import DetailInput from "../component/DetailInput";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  return (
    <div>
      <div>
        <div>
          {/* <img src={} alt={product.name} /> */}
          <div>
            <div>
              <p>{product.name}</p>
              <p>{product.price}원</p>
            </div>
            <div>
              <div>
                <p>상품 소개</p>
                <p>{product.description}</p>
              </div>
              <div>
                <p>상품 태그</p>
                <div>
                  {product.tags.map((tag, index) => (
                    <p key={index}>#{tag}</p>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div>
                {/* 프레임 */}
                <div>
                  <p>{product.ownerNickname}</p>
                  <p>{/* 날짜 */}</p>
                </div>
              </div>
              <p>
                <img src={HeartIcon} />
                {product.favoriteCount}
              </p>
            </div>
          </div>
        </div>
        <DetailInput productId={productId} />
        <DetailComment productId={productId} />
        <Link to="/items">
          <button>목록으로 돌아가기</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
