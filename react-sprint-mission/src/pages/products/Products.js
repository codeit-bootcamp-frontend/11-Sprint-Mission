import React, { useCallback, useEffect, useState } from "react";
import { ImgPath, ItemHeader, Button, UserIconInfo } from "components/index";
import { useParams } from "react-router-dom";
import { getAxios } from "utils/api";
import "./Products.css";
import Comments from "components/Comments";

function Products(props) {
  const { id } = useParams();
  const [productData, setProductData] = useState();

  const getProductData = useCallback(async () => {
    const res = await getAxios({
      path: `${process.env.REACT_APP_API_URL}/${id}`,
    });
    if (res.status === 200) {
      const newData = {
        ...res.data,
        price: `${res.data.price.toLocaleString()}원`,
        updatedAt: res.data.updatedAt.substring(0, 10),
      };
      setProductData(newData);
    } else {
      alert("제품 조회중 오류가 발생했습니다.");
    }
  }, [id]);

  useEffect(() => {
    getProductData(id);
  }, [getProductData, id]);
  return (
    productData && (
      <main>
        <ItemHeader />
        <section className="section">
          <div className="productsContents">
            <img
              className="productImg"
              src={`${productData.images[0]}`}
              alt="itemImg"
            />
            <div className="productDetail">
              <h2>{productData.name}</h2>
              <h2>{productData.price}</h2>
              <div className="line" />
              <span className="productDescTitle">상품 소개</span>
              <span className="productDesc">{productData.description}</span>
              <span className="productDescTitle">상품 태그</span>
              <div className="productTag">
                {productData.tags.map((tag, idx) => {
                  return (
                    <button key={`tagButton${idx}`} className="tagButton">
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="spaceBetween">
                <UserIconInfo
                  nickname={productData.ownerNickname}
                  desc={productData.updatedAt}
                />
                <Button className="heartButton" bg="var(--skyblue)">
                  <img src={ImgPath("/common/ic_heart.png")} alt="heart" />
                  {productData.favoriteCount}
                </Button>
              </div>
            </div>
          </div>
          <div className="line" />
          <Comments id={id} />
        </section>
      </main>
    )
  );
}

export default Products;
