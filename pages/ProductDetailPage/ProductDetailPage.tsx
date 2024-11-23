import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getDetailComments } from "../api/api";
// import { ReactComponent as HeartIcon } from "../../images/ic_heart.svg";
import { ReactComponent as BackIcon } from "../../images/ic_back.svg";
// import DetailComment from "./component/DetailComment";
import DetailInput from "./component/DetailInput";
import ItemContent from "./component/ItemContent";

function ProductDetail() {
  // const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았어요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getDetailComments(productId);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (error) {
    alert(`오류: ${error}`);
  }

  if (!productId || !product) return null;

  return (
    //   <div>
    //     <div>
    //       <div>
    //         {/* <img src={} alt={product.name} /> */}
    //         <div>
    //           <div>
    //             <p>{product.name}</p>
    //             <p>{product.price}원</p>
    //           </div>
    //           <div>
    //             <div>
    //               <p>상품 소개</p>
    //               <p>{product.description}</p>
    //             </div>
    //             <div>
    //               <p>상품 태그</p>
    //               <div>
    //                 {product.tags.map((tag, index) => (
    //                   <p key={index}>#{tag}</p>
    //                 ))}
    //               </div>
    //             </div>
    //           </div>
    //           <div>
    //             <div>
    //               {/* 프레임 */}
    //               <div>
    //                 <p>{product.ownerNickname}</p>
    //                 <p>{/* 날짜 */}</p>
    //               </div>
    //             </div>
    //             <p>
    //               <img src={HeartIcon} />
    //               {product.favoriteCount}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <DetailInput productId={productId} />
    //       <DetailComment productId={productId} />
    //       <Link to="/items">
    //         <button>목록으로 돌아가기</button>
    //       </Link>
    //     </div>
    //   </div>

    <div>
      {isLoading && (
        <div className="loadingSpinner">
          <div className="spinner"></div>
        </div>
      )}

      <div className="container">
        <ItemContent product={product} />

        <hr />

        <DetailInput productId={productId} />

        {/* 목록으로 돌아가기 버튼 */}
        <Link className="backHomePage" to="/items">
          목록으로 돌아가기
          <BackIcon className="backIcon" />
        </Link>
      </div>
    </div>
  );
}

export default ProductDetail;
