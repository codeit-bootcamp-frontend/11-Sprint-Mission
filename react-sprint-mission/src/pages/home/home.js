import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { ImgPath } from "components";

function Home(props) {
  return (
    <>
      <header>
        <div className="header">
          <Link to="/">
            <img className="logo" src={ImgPath("/common/logo_pc.png")} alt="Home" />
          </Link>
          <Link to="/Login">
            <img className="login" src={ImgPath("/common/login_bt.png")} alt="로그인" />
          </Link>
        </div>
      </header>
      <main>
        <div className="banner-header">
          <div className="banner-header-info">
            <h1 className="banner-header-txt">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </h1>
            <button className="bannerButton">
              <Link to="Item">구경하러 가기</Link>
            </button>
          </div>
        </div>
        <section>
          <div className="contents">
            <div className="contentsForm">
              <img className="contents-home-img" src={ImgPath("/main/pc_content_hot_item.png")} alt="hotItem" />
              <div className="contents-detail">
                <h2 className="contents-detail-top">Hot item</h2>
                <h1 className="contents-detail-mid">
                  인기 상품을
                  <br className="detail-break-top" />
                  확인해 보세요
                </h1>
                <p className="contents-detail-bottom">
                  가장 HOT한 중고거래 물품을
                  <span className="detail-break-bottom">
                    <br />
                  </span>
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
          <div className="contents">
            <div className="contentsForm">
              <div className="contents-detail">
                <h2 className="contents-detail-top">Search</h2>
                <h1 className="contents-detail-mid">
                  구매를 원하는
                  <span className="break-on-desktop">
                    <br />
                  </span>
                  상품을 검색하세요
                </h1>
                <p className="contents-detail-bottom">
                  구매하고 싶은 물건은 검색해서
                  <span className="break">
                    <br />
                  </span>
                  쉽게 찾아보세요
                </p>
              </div>
              <img className="contentsSearch-img" src={ImgPath("/main/pc_content_search.png")} alt="search" />
            </div>
          </div>
          <div className="contents">
            <div className="contentsForm">
              <img className="contents-register-img" src={ImgPath("/main/pc_content_register.png")} alt="register" />
              <div className="contents-detail">
                <h2 className="contents-detail-top">Register</h2>
                <h1 className="contents-detail-mid">
                  판매를 원하는
                  <span className="break-on-desktop">
                    <br />
                  </span>
                  상품을 등록하세요
                </h1>
                <p className="contents-detail-bottom">
                  어떤 물건이든 판매하고 싶은 상품을
                  <span className="break">
                    <br />
                  </span>
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
          <div className="banner-footer">
            <div className="banner-footer-info">
              <div className="banner-bottom-txt">
                믿을 수 있는
                <span className="break">
                  <br />
                </span>
                판다마켓 중고 거래
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="since">
          <img src={ImgPath("/common/since.png")} alt="since" />
        </div>
        <div className="info">
          <Link to="/Privacy">
            <img src={ImgPath("/common/privacy_policy.png")} alt="policy" />
          </Link>
          <Link to="/Fqa">
            <img src={ImgPath("/common/FAQ.png")} alt="faq" />
          </Link>
        </div>
        <div className="platforms">
          <img src={ImgPath("/common/ic_facebook.png")} alt="facebook" />
          <img src={ImgPath("/common/ic_instagram.png")} alt="instagram" />
          <img src={ImgPath("/common/ic_twitter.png")} alt="twitter" />
          <img src={ImgPath("/common/ic_youtube.png")} alt="youtube" />
        </div>
      </footer>
    </>
  );
}

export default Home;
