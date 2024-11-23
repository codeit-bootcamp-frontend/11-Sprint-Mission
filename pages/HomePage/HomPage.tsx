import React from "react";
import Link from "next/link";
import Image from "next/image";
// import "./common.css";
import "./HomePage.css";

// 이미지 import
// import logo from "../../public/images/logo.svg";
import imgHomeTop from "../../public/images/Img_home_top.png";
import imgHome01 from "../../public/images/Img_home_01.png";
import imgHome02 from "../../public/images/Img_home_02.png";
import imgHome03 from "../../public/images/Img_home_03.png";
import imgHomeBottom from "../../public/images/Img_home_bottom.png";
import facebookIcon from "../../public/images/facebook.svg";
import twitterIcon from "../../public/images/twiter.svg";
import youtubeIcon from "../../public/images/youtube.svg";
import instagramIcon from "../../public/images/instargram.svg";

function HomePage() {
  return (
    <div>
      {/* <header className="nav">
        <a href="index.html">
          <img className="logo" src={logo} alt="판다마켓" />
        </a>
        <button
          onClick={() => (window.location.href = "signin.html")}
          className="login"
        >
          로그인
        </button>
      </header> */}

      <main>
        <section className="home_top_section banner">
          <div className="home_top_div">
            <div className="div_top">
              <p className="subtitle top_sub">
                일상의 모든 물건을 <br className="brPc" />
                거래해 보세요
              </p>
              <br />
              {/* <button
                onClick={() => (window.location.href = "items.html")}
                className="items_btn"
              >
                구경하러 가기
              </button> */}
              <Link href="/items">
                <button className="items_btn">구경하러 가기</button>
              </Link>
            </div>
            <Image className="home_img_top" src={imgHomeTop} alt="판다" />
          </div>
        </section>

        <section className="home_section container">
          <div className="home_div">
            <Image className="home_img" src={imgHome01} alt="인기 상품" />
            <div className="text">
              <p className="ptitle">Hot item</p>
              <br />
              <p className="subtitle">
                인기 상품을 <br className="brPc" />
                확인해 보세요
              </p>
              <br />
              <p className="pcontent">
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </section>

        <section className="home_section container section_search">
          <div className="home_div div_search">
            <div className="text">
              <p className="ptitle">Search</p>
              <br />
              <p className="subtitle">
                구매를 원하는 <br className="brPc" />
                상품을 검색하세요
              </p>
              <br />
              <p className="pcontent">
                구매하고 싶은 물품은 검색해서 <br />
                쉽게 찾아보세요
              </p>
            </div>
            <Image className="home_img" src={imgHome02} alt="상품 검색" />
          </div>
        </section>

        <section className="home_section container">
          <div className="home_div">
            <Image className="home_img" src={imgHome03} alt="상품 등록" />
            <div className="text">
              <p className="ptitle">Register</p>
              <br />
              <p className="subtitle">
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <br />
              <p className="pcontent">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section className="home_bottom_section banner">
          <div className="home_bottom_div">
            <div className="bottom_div">
              <p className="subtitle bottom_sub">
                믿을 수 있는 <br className="brPc" />
                판다마켓 중고 거래
              </p>
            </div>
            <Image className="home_img_bottom" src={imgHomeBottom} alt="판다" />
          </div>
        </section>
      </main>

      <footer>
        <div className="codeit">@codeit - 2024</div>
        <div className="footer_menu">
          <a href="privacy.html">Privacy Policy</a>
          <a href="faq.html">FAQ</a>
        </div>
        <div className="footer_icon">
          <a href="https://www.facebook.com/">
            <Image className="facebook" src={facebookIcon} alt="Facebook" />
          </a>
          <a href="https://x.com/">
            <Image className="twitter" src={twitterIcon} alt="Twitter" />
          </a>
          <a href="https://www.youtube.com/">
            <Image className="youtube" src={youtubeIcon} alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/">
            <Image className="instargram" src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
