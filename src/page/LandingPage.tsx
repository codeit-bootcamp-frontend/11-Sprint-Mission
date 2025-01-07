import React from "react";
import Header from "../components/LandingPage/Header";
import MainAdSection from "../components/LandingPage/MainAdSection";
import BoxSection from "../components/LandingPage/BoxSection";
import SubAdSection from "../components/LandingPage/SubAdSection";
import Footer from "../components/LandingPage/Footer";
import "./LandingPage.css";
import BoxSection1 from "../assets/image/Img_home_01.png";
import BoxSection2 from "../assets/image/Img_home_02.png";
import BoxSection3 from "../assets/image/Img_home_03.png";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <MainAdSection />
        <BoxSection
          imageSrc={BoxSection1}
          sectionHead="Hot item"
          bigText1="인기 상품을"
          bigText2="확인해 보세요"
          smallText1="가장 HOT한 중고거래 물품을"
          smallText2="판다 마켓에서 확인해 보세요"
        />
        <BoxSection
          imageSrc={BoxSection2}
          sectionHead="Search"
          bigText1="구매를 원하는"
          bigText2="상품을 검색하세요"
          smallText1="구매하고 싶은 물품을 검색해서"
          smallText2="쉽게 찾아보세요"
        />
        <BoxSection
          imageSrc={BoxSection3}
          sectionHead="Register"
          bigText1="판매를 원하는"
          bigText2="상품을 등록하세요"
          smallText1="어떤 물건이든 판매하고 싶은 상품을"
          smallText2="쉽게 등록하세요"
        />
        <SubAdSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
