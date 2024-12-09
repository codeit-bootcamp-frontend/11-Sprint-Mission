import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductDetail } from "@/lib/api";
import { ProductDetail } from "@/types/commontypes";
import ItemComments from "@/components/ItemComment";
import favoriteIcon from "@/public/svgs/ic_heart (1).svg";
import profileIcon from "@/public/svgs/Frame 2609463.svg";
import plusBtn from "@/public/svgs/Group 33735 (1).svg";
import backIcon from "@/public/svgs/ic_back.svg";
import Image from "next/image";
import styles from "@/styles/itemdetail.module.css";
import defaultImg from "@/public/svgs/Group 33735 (1).svg";

export default function ItemDetailForm() {
  const router = useRouter();
  const { productId } = router.query;
  const [item, setItem] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const dateOnly =
    item && item.createdAt
      ? item.createdAt.split("T")[0].replace(/-/g, ".")
      : "";

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId || typeof productId !== "string") {
        setError("상품 ID가 없습니다.");
        return;
      }
      setLoading(true);
      try {
        const data = await getProductDetail(productId);
        setItem(data);
      } catch (error) {
        setError("상품 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const handleGoBack = () => {
    router.push("/items");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.item_detail}>
      <div className={styles.item_detail_container}>
        <div className={styles.item_detail_top_container}>
          <div className={styles.item_detail_top}>
            <div className={styles.item_detail_images}>
              {item.images && item.images.length > 0 ? (
                item.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image ? image : defaultImg.src}
                    alt={`상품 이미지 ${index + 1}`}
                    width={486}
                    height={486}
                    className={styles.item_detail_image}
                  />
                ))
              ) : (
                <div>이미지가 없습니다.</div>
              )}
            </div>

            <div className={styles.item_detail_info}>
              <div className={styles.item_detail_info_top}>
                <div className={styles.item_detail_title}>
                  <div className={styles.item_detail_name_container}>
                    <div className={styles.item_detail_name}>{item.name}</div>
                    <Image
                      src={plusBtn}
                      width={3}
                      height={13}
                      className={styles.item_detail_more}
                      alt="더보기 아이콘"
                    />
                  </div>
                  <div className={styles.item_detail_price}>
                    {item.price.toLocaleString()}원
                  </div>
                </div>
                <div className={styles.item_detail_introduce}>
                  <div className={styles.item_detail_introduce_title}>
                    상품 소개
                  </div>
                  <p className={styles.item_detail_description}>
                    {item.description}
                  </p>
                </div>
              </div>

              <div className={styles.item_detail_info_bottom}>
                <div className={styles.item_detail_tags_container}>
                  <div className={styles.item_detail_tags_title}>상품 태그</div>
                  <div className={styles.item_detail_tags}>
                    {item.tags && item.tags.length > 0 ? (
                      item.tags.map((tag, index) => (
                        <span key={index} className={styles.item_detail_tag}>
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <div>태그가 없습니다.</div>
                    )}
                  </div>
                </div>

                <div className={styles.item_detail_author}>
                  <div className={styles.item_detail_author_info}>
                    <Image
                      src={profileIcon}
                      width={40}
                      height={40}
                      className={styles.item_detail_author_image}
                      alt="프로필 사진"
                    />
                    <div className={styles.item_detail_author_end}>
                      <div className={styles.item_detail_author_nickname}>
                        {item.ownerNickname}
                      </div>
                      <div className={styles.item_detail_createdAt}>
                        {dateOnly}
                      </div>
                    </div>
                  </div>
                  <div className={styles.item_detail_favorite}>
                    <Image
                      src={favoriteIcon}
                      width={27}
                      height={23}
                      className={styles.item_detail_favorite_icon}
                      alt="좋아요 아이콘"
                    />
                    <div className={styles.item_detail_favorite_count}>
                      {item.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.item_detail_bottom_container}>
          <div className={styles.item_detail_bottom}>
            <div className={styles.item_detail_comments}>
              <ItemComments />
            </div>
          </div>

          <div className={styles.item_detail_button_container}>
            <button
              onClick={handleGoBack}
              className={styles.item_detail_back_button}
            >
              목록으로 돌아가기
              <Image
                src={backIcon}
                width={24}
                height={24}
                className={styles.back_icon}
                alt="뒤로가기 아이콘"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
