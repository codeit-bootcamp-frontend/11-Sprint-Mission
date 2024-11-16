import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../api/api";
import Nav from "../components/Nav";
import ItemDetail from "../components/ItemDetail";
import Comments from "../components/Comments";
import BackIcon from "../assets/icons/ic_back.svg";
import "./ItemDetailPage.css";

interface CommentData {
  id: string;
  content: string;
  writer: { nickname: string; image: string };
  updatedAt: string;
}

type Params = Record<string, string | undefined>;

function ItemDetailPage() {
  const { productId } = useParams<Params>();
  const [data, setData] = useState<CommentData[]>([]);

  const handleLoadData = async () => {
    if (!productId) return;

    // 문자열 `productId`를 숫자로 변환
    const numericProductId = Number(productId);
    if (isNaN(numericProductId)) {
      console.error("유효하지 않은 상품Id:", productId);
      return;
    }

    const params = { productId: numericProductId };
    const result = await getComment(params);
    setData(result.list);
  };

  useEffect(() => {
    handleLoadData();
  }, [productId]);

  return (
    <>
      <Nav />
      <main className="item-detail-page">
        <div className="detail-conent">
          <article className="item-detail-container">
            <ItemDetail />
          </article>
          <section className="item-comments-container">
            <Comments commentList={data} />
          </section>
        </div>
        <Link to="/items">
          <button className="return-list-btn">
            <div className="return-btn-text">목록으로 돌아가기</div>
            <img src={BackIcon} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </main>
    </>
  );
}

export default ItemDetailPage;
