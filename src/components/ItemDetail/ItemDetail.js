import ic_profile from "../../assets/images/profile.svg";
import ic_favorite from "../../assets/images/ic_heart.svg";
import ic_kebab from "../../assets/images/ic_kebab.svg";
import styles from "./ItemDetail.module.css";
import img_default from "../../assets/images/thumbnail-placeholder.png";

function ItemDetail({ className, item }) {
  const handleErrorLoadingImg = (e) => {
    e.target.src = img_default;
  };

  return (
    <div className={className}>
      <div className={styles["Item"]}>
        <img
          className={styles["image"]}
          src={item?.images[0]}
          alt={item?.name}
          onError={handleErrorLoadingImg}
        />
        <div className={styles["main"]}>
          <div className={styles["header"]}>
            <h1 className={styles["title"]}>{item?.name}</h1>
            <img src={ic_kebab} alt="케밥" />
            <p className={styles["price"]}>
              {item?.price.toLocaleString("kr-KR")}
            </p>
          </div>
          <div className={styles["description"]}>
            <h2 className={styles["title"]}>상품 소개</h2>
            <p className={styles["content"]}>{item?.description}</p>
          </div>
          <div className={styles["tag-list"]}>
            <h2 className={styles["title"]}>상품 태그</h2>
            <div className={styles["content"]}>
              {item?.tags.map((tag) => (
                <span key={tag} className={styles["tag"]}>{`#${tag}`}</span>
              ))}
            </div>
          </div>
          <div className={styles["footer"]}>
            <div className={styles["owner"]}>
              <img
                className={styles["profile"]}
                src={ic_profile}
                alt="판매자 프로필"
              />
              <div className={styles["main"]}>
                <div className={styles["name"]}>총명한 판다</div>
                <div className={styles["date"]}>2024.01.02</div>
              </div>
            </div>
            <span className={styles["favorite"]}>
              <img src={ic_favorite} alt="좋아요" />
              {item?.favoriteCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
