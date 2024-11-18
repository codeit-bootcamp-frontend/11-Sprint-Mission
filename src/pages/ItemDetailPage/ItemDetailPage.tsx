import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../api";
import styles from "./ItemDetailPage.module.css";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import CommentForm from "../../components/CommentForm/CommentForm";
import ic_back from "../../assets/images/ic_back.svg";
import { ProductExtended } from "../../types/Product";

function ItemDetailPage() {
  const [item, setItem] = useState<ProductExtended>();
  const { id } = useParams<{ id: string }>();

  useEffect((): void => {
    const fetchDate = async () => {
      if (!id) return;
      const result = await getProductById(id);
      setItem(result);
    };
    fetchDate();
  }, [id]);

  return (
    <div className={`${styles["container"]}`}>
      {item && <ItemDetail className={styles["ItemDetail"]} item={item} />}
      <CommentForm className={styles["CommentForm"]} productId={id} />
      <Link className={styles["btn-back"]} to="/items">
        목록으로 돌아가기
        <img src={ic_back} alt="뒤로가기 버튼 아이콘" />
      </Link>
    </div>
  );
}

export default ItemDetailPage;
