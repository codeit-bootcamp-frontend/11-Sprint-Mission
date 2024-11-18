import React from "react";
import Banner from "../components/ section/Banner";
import CardInfo from "../components/ section/CardInfo";
import "./HomePage.css";
import Footer from "../components/common/Footer";
import banerImage1 from "../images/banner_image.png";
import banerImage2 from "../images/banner_image2.png";
import section1 from "../images/section1.png";
import section2 from "../images/section2.png";
import section3 from "../images/section3.png";

const cardsData = [
  {
    imgSrc: section1,
    altText: "인기상품 확인해보세요",
    label: "Hot item",
    title: "인기 상품을\n확인해 보세요",
    text: "가장 HOT한 중고거래 물품을 <br /> 판다 마켓에서 확인해 보세요",
  },
  {
    imgSrc: section2,
    altText: "상품을 검색하세요",
    label: "Search",
    title: "구매를 원하는\n상품을 검색하세요",
    text: "구매하고 싶은 물품은 검색해서 <br /> 쉽게 찾아보세요",
    reverse: true,
  },
  {
    imgSrc: section3,
    altText: "상품을 검색하세요",
    label: "Register",
    title: "판매를 원하는 상품을\n등록하세요",
    text: "어떤 물건이든 판매하고 싶은 상품을 <br /> 쉽게 등록하세요",
  },
];

const HomePages = () => {
  return (
    <>
      <main>
        <Banner
          title="일상의 모든 물건을\n거래해 보세요"
          buttonText="구경하러 가기"
          buttonLink="/items"
          imageUrl={banerImage1}
        ></Banner>
        {cardsData.map((card, index) => (
          <CardInfo
            key={index}
            imgSrc={card.imgSrc}
            altText={card.altText}
            reverse={card.reverse}
          >
            <span className="section-label">{card.label}</span>
            <h2
              dangerouslySetInnerHTML={{
                __html: card.title.replace(/\n/g, "<br />"),
              }}
            />
            <p
              className="section-text"
              dangerouslySetInnerHTML={{ __html: card.text }}
            />
          </CardInfo>
        ))}
        <Banner
          title="일상의 모든 물건을\n거래해 보세요"
          imageUrl={banerImage2}
        ></Banner>
      </main>
      <Footer />
    </>
  );
};

export default HomePages;
