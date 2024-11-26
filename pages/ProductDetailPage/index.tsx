import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getDetailComments } from "../../api/api";
import BackIcon from "../../images/ic_back.svg";
import DetailInput from "../../components/productdetail/DetailInput";
import ItemContent from "../../components/productdetail/ItemContent";

export default function ProductDetail() {
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
        <Link className="backHomePage" href="/items">
          목록으로 돌아가기
          <BackIcon className="backIcon" />
        </Link>
      </div>
    </div>
  );
}
