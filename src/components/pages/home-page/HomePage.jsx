import React from 'react';
import HomeHeader from './HomeHeader';
import Content from './Content';
import HomeFooter from './HomeFooter';
import Hero from './Hero';
import '../../../styles/home-page.css';

function HomePage() {
  return (
    <>
      <HomeHeader />
      <main>
        <Hero
          title="일상의 모든 물건을<br />거래해 보세요"
          buttonText="구경하러 가기"
          imageSrc="/images/contents/img_home_top.png"
          altText="상단 히어로 이미지"
          brClassName="hero-br"
        />
        <div className="main-content-wrapper">
          <Content
            title="인기 상품을<br />확인해 보세요"
            description="가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요"
            imageSrc="/images/contents/img_home_01.png"
            caption="Hot item"
            brClassName="content-br"
          />
          <Content
            title="구매를 원하는<br />상품을 검색하세요"
            description="구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요"
            imageSrc="/images/contents/img_home_02.png"
            caption="search"
            alignRight
            brClassName="content-br"
          />
          <Content
            title="판매를 원하는<br />상품을 등록하세요"
            description="어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요"
            imageSrc="/images/contents/img_home_03.png"
            caption="Register"
            brClassName="content-br"
          />
        </div>
        <Hero
          title="믿을 수 있는<br />판다마켓 중고 거래"
          imageSrc="/images/contents/img_home_bottom.png"
          altText="하단 히어로 이미지"
          isBottom
        />
      </main>
      <HomeFooter />
    </>
  );
}

export default HomePage;
