import { useState } from "react";
import Link from "next/link";
import { AllItemCardProps } from "@/types/commontypes";
import styles from "@/styles/items.module.css";
import heartIcon from "@/public/svgs/ic_heart (1).svg";
import Image from "next/image";
import defaultImg from "@/public/pngs/noImage.png";

export default function AllItemCard({ item }: AllItemCardProps) {
  const [imageSrc, setImageSrc] = useState(item.images[0] || defaultImg.src);

  const handleImageError = () => {
    setImageSrc(defaultImg.src);
  };

  return (
    <Link href={`/items/${item.id}`} className={styles.link}>
      <div className={styles.item_card}>
        <Image
          src={imageSrc}
          alt={item.name}
          width={221}
          height={221}
          className={styles.all_item_card_img}
          onError={handleImageError}
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
