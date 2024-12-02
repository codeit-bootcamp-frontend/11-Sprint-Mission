import Link from "next/link";
import { AllItemCardProps } from "@/types/commontypes";
import styles from "@/styles/bestitem.module.css";
import heartIcon from "@/public/svgs/ic_heart (1).svg";
import Image from "next/image";

function BestItemCard({ item }: AllItemCardProps) {
  return (
    <div className={styles.item_card}>
      <img
        src={item.images[0]}
        alt={item.name}
        className={styles.item_card_img}
      />

      <div className={styles.item_description}>
        <div className={styles.item_name}>{item.name}</div>
        <div className={styles.item_price}>{item.price.toLocaleString()}원</div>
        <div className={styles.item_favorite_count}>
          <Image src={heartIcon} alt="하트 아이콘" width={16} height={16} />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default BestItemCard;
