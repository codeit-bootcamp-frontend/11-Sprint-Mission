import { getDetailComments } from "@/api/api";
import DetailInput from "@/components/productdetail/DetailInput";
import ItemContent from "@/components/productdetail/ItemContent";
import { Product } from "@/types/Types";
import Image from "next/image";
import BackIcon from "@/public/images/ic_back.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ItemPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;

  const productId = Number(id);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았어요.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data: Product = await getDetailComments(productId);
        if (!data) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(data);
      } catch (error: any) {
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
          <Image
            src={BackIcon}
            alt="돌아가기"
            width={24}
            height={24}
            className="backIcon"
          />
        </Link>
      </div>
    </div>
  );
};

export default ItemPage;
