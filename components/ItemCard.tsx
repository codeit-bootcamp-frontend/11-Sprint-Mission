import Link from "next/link";
import { AllItemCardProps } from "@/types/commontypes";
import styles from "@/styles/items.module.css";

function AllItemCard({ item }: AllItemCardProps) {
  const handleNoneImg = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src;
  };

  return (
    <div className={styles.item_card}>
      <img
        src={item.images[0]}
        alt={item.name}
        className={styles.all_item_card_img}
        onError={handleNoneImg}
      />
      <div className={styles.item_description}>
        <div className={styles.item_name}>{item.name}</div>
        <div className={styles.item_price}>{item.price.toLocaleString()}원</div>
        <div className={styles.item_favorite_count}>{item.favoriteCount}</div>
      </div>
    </div>
  );
}

export default AllItemCard;
