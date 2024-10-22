import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getComment } from "../api/api";
import Nav from "../components/Nav";
import ItemDetail from "../components/ItemDetail";
import Comments from "../components/Comments";
import BackIcon from "../assets/icons/ic_back.svg";
import "./ItemDetailPage.css";

function ItemDetailPage() {
  const itemId = useParams();
  console.log(itemId);
  const [data, setData] = useState([]); //댓글 데이터

  const handleLoadData = async () => {
    const params = {
      productId: itemId.productId,
    };
    let result;
    result = await getComment(params);
    // console.log(result.list);
    setData(result.list);
  };

  useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      <Nav />
      <main className="item-detail-page">
        <div className="detail-conent">
          <article className="item-detail-container">
            <ItemDetail />
          </article>
          <section className="item-comments-container">
            <Comments commentList={data} /* 외우기!!! */ />
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
