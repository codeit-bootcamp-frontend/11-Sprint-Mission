import { useEffect, useState } from "react";
import { getBestProductList, getProductList } from "../services/api";
import style from "../css/items.module.css";
import iconHeart from "../img/ic_heart.png";
import imgError from "../img/img_error.png";
import Dropdown from "../components/Dropdown";

const Items = () => {
  const [productList, setProductList] = useState([]);
  const [bestProdunctList, setBestProductList] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    loadProductList();
    loadBestProductList();
  }, []);

  useEffect(() => {
    const sortedProducts = [...productList].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === "likes") {
        return b.favoriteCount - a.favoriteCount;
      }
      return 0;
    });
    setProductList(sortedProducts);
  }, [sortOrder]);

  const loadProductList = async () => {
    try {
      const body = await getProductList();
      console.log("body: ", body);
      setProductList(body.list);
    } catch (error) {
      console.error("Error loading product list: ", error);
    }
  };

  const loadBestProductList = async () => {
    const body = await getBestProductList();
    console.log("body: ", body);
    setBestProductList(body.list);
  };

  return (
    <>
      <div className={style.container}>
        <h2 className={style.title}>베스트 상품</h2>
        <ul className={style.bestProductList}>
          {bestProdunctList.map((list) => (
            <li className={style.bestProductItem} key={list.id}>
              <div>
                <img
                  className={style.BestProductImage}
                  src={list.images[0]}
                  alt={list.name}
                  onerror={imgError}
                />
              </div>
              <div className={style.productName}>{list.name}</div>
              <div className={style.price}>{list.price.toLocaleString()}원</div>
              <div className={style.favoriteArea}>
                <img src={iconHeart} className={style.icon} alt="" />
                <div className={style.favoriteCount}>{list.favoriteCount}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.container}>
        <div className={style.titleHeader}>
          <h2 className={style.title}>전체 상품</h2>
          <a className={style.btnPrimary} href="/addItem">
            상품 등록하기
          </a>
          <Dropdown onSortChange={setSortOrder} />
        </div>
        <ul className={style.allProductList}>
          {productList.map((list) => (
            <li className={style.productItem} key={list.id}>
              <div>
                <img
                  className={style.productImage}
                  src={list.images[0]}
                  alt=""
                />
              </div>
              <div className={style.productName}>{list.name}</div>
              <div className={style.price}>{list.price.toLocaleString()}원</div>
              <div className={style.favoriteArea}>
                <img src={iconHeart} className={style.icon} alt="" />
                <div className={style.favoriteCount}>{list.favoriteCount}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Items;
