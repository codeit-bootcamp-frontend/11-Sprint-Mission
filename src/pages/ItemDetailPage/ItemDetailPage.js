import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../api";
import styles from "./ItemDetailPage.module.css";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import CommentForm from "../../components/CommentForm/CommentForm";

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
      <ItemDetail className={styles["ItemDetail"]} item={item} />
      <CommentForm className={styles["CommentForm"]} />
    </div>
  );
}

export default ItemDetailPage;
