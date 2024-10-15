import { useEffect, useState } from "react";
import { getBestProductList, getProductList } from "../services/api";
import style from "../css/items.module.css";
import iconHeart from "../img/ic_heart.png";
import imgError from "../img/img_error.png";

const Items = () => {
  const [productList, setProductList] = useState([]);
  const [bestProdunctList, setBestProductList] = useState([]);

  useEffect(() => {
    loadProductList();
    loadBestProductList();
  }, []);

  const loadProductList = async () => {
    const body = await getProductList();
    console.log("body: ", body);
    setProductList(body.list);
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
                  className={style.productImage}
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
        <h2 className={style.title}>전체 상품</h2>
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
