import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { getProducts } from "@/lib/api";
import Pagination from "@/components/Pagination";
import { Product } from "@/types/commontypes";
import styles from "@/styles/items.module.css";
import searchIcon from "@/public/svgs/ic_search.svg";
import Image from "next/image";

const getPageSize = () => {
  if (typeof window === "undefined") return 10;
  const width = window.innerWidth;
  if (width < 768) {
    return 4;
  } else if (width < 1280) {
    return 6;
  } else {
    return 10;
  }
};

function AllItems() {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(getPageSize());
  const [items, setItems] = useState<Product[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [totalPageNum, setTotalPageNum] = useState<number>(0);

  useEffect(() => {
    const handleFixSize = () => {
      setPageSize(getPageSize());
    };

    const fetchProducts = async ({
      orderBy,
      page,
      pageSize,
    }: {
      orderBy: string;
      page: number;
      pageSize: number;
    }) => {
      const products = await getProducts({ orderBy, page, pageSize });
      setItems(products.list);
      setTotalPageNum(Math.ceil(products.totalCount / pageSize));
    };

    window.addEventListener("resize", handleFixSize);
    fetchProducts({ orderBy, page, pageSize });

    return () => {
      window.removeEventListener("resize", handleFixSize);
    };
  }, [orderBy, page, pageSize]);

  const handleNextPage = (newPage: number) => {
    setPage(newPage);
  };

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleOrderByChange = (newOrderBy: string) => {
    setOrderBy(newOrderBy);
    setPage(1);
    setIsDropdown(false);
  };

  return (
    <div className={styles.all_item_container}>
      <div className={styles.all_item_content}>
        <div className={styles.all_item_header}>
          <div className={styles.all_item_header_front}>
            <div className={styles.all_item_title}>전체 상품</div>
            <div className={styles.all_item_search_container}>
              <Image
                className={styles.all_item_search_icon}
                src={searchIcon}
                alt="돋보기 아이콘"
                width={24}
                height={24}
              />
              <input
                className={styles.all_item_search_input}
                placeholder="검색할 상품을 입력해주세요"
              />
            </div>
          </div>
          <div className={styles.all_item_header_end}>
            <div className={styles.all_item_sort}>
              <a href="./additem">
                <button className={styles.all_item_register_button}>
                  상품 등록하기
                </button>
              </a>
              <button
                className={styles.all_item_sort_button}
                onClick={toggleDropdown}
              >
                {orderBy === "recent" ? "최신순" : "좋아요순"} ▼
              </button>
              {isDropdown && (
                <div className={styles.all_item_sort_options}>
                  <div onClick={() => handleOrderByChange("recent")}>
                    최신순
                  </div>
                  <div onClick={() => handleOrderByChange("favorite")}>
                    좋아요순
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.all_item_card_container}>
          {items?.map((item) => (
            <ItemCard item={item} key={`all_item_${item.id}`} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPageNum={totalPageNum}
          onPageChange={handleNextPage}
        />
      </div>
    </div>
  );
}

export default AllItems;
