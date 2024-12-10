import Link from "next/link";
import { AllItemCardProps } from "@/types/commontypes";
import styles from "@/styles/bestitem.module.css";
import heartIcon from "@/public/svgs/ic_heart (1).svg";
import Image from "next/image";

export default function BestItemCard({ item }: AllItemCardProps) {
  return (
    <Link href={`/items/${item.id}`} className={styles.link}>
      <div className={styles.item_card}>
        <Image
          src={item.images[0]}
          alt={item.name}
          className={styles.item_card_img}
          width={282}
          height={282}
        />

        <div className={styles.item_description}>
          <div className={styles.item_name}>{item.name}</div>
          <div className={styles.item_price}>
            {item.price.toLocaleString()}원
          </div>
          <div className={styles.item_favorite_count}>
            <Image src={heartIcon} alt="하트 아이콘" width={16} height={16} />
            {item.favoriteCount}
          </div>
        </div>
      </div>
    </Link>
  );
}
