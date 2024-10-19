import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../api";
import styles from "./ItemDetailPage.module.css";
import ItemDetail from "../../components/ItemDetail/ItemDetail";

function ItemDetailPage() {
  const [item, setItem] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchDate = async () => {
      const result = await getProductById(id);
      setItem(result);
    };
    fetchDate();
  }, [id]);

  return (
    <div className={`${styles["container"]}`}>
      <ItemDetail item={item} />
      <CommentForm />
    </div>
  );
}

function CommentForm() {
  return (
    <div>
      <form>
        <label htmlFor="input-comment">문의하기</label>
        <textarea
          name="comment"
          id="input-comment"
          placeholder="개인정보를 공유 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 계시자에게 있습니다."
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default ItemDetailPage;
