import "./Main.css";
import Logo from "../../images/logo/panda-market-logo.png";
import { HeroButton, LoginButton } from "../../components/Button/Button";
import firstSectionImage from "../../images/home/hero-image.png";
import figureImage01 from "../../images/home/feature1-image.png";
import figureImage02 from "../../images/home/feature2-image.png";
import figureImage03 from "../../images/home/feature3-image.png";
import bottomSectionImage from "../../images/home/bottom-banner-image.png";
import facebook from "../../images/social/facebook-logo.svg";
import twitter from "../../images/social/twitter-logo.svg";
import youtube from "../../images/social/youtube-logo.svg";
import instagram from "../../images/social/instagram-logo.svg";

function Main() {
  return (
    <div>
      <header>
        <img className="Logo" src={Logo} alt="" />
        <LoginButton text="로그인" />
      </header>
      <main>
        <section className="heroSection">
          <div className="banner">
            <div className="heroWordBox">
              <p className="mainWord">
                일상의 모든 물건을 <br />
                거래해보세요
              </p>
              <HeroButton text="구경하러가기" />
            </div>
            <img className="heroImage" src={firstSectionImage} alt="" />
          </div>
        </section>

        <section className="mainSection">
          <div className="sections">
            <figure>
              <img className="homeImage" src={figureImage01} alt="" />
              <div>
                <p className="featureTag">Hot item</p>
                <p className="mainWord">
                  인기 상품을
                  <br />
                  확인해 보세요
                </p>
                <p className="featureDescription">
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다마켓에서 확인해 보세요
                </p>
              </div>
            </figure>
          </div>
          <div className="sections">
            <figure>
              <div>
                <p className="featureTag">Search</p>
                <p className="mainWord">
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </p>
                <p className="featureDescription">
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </p>
              </div>
              <img className="homeImage" src={figureImage02} alt="" />
            </figure>
          </div>
          <div className="sections">
            <figure>
              <img className="homeImage" src={figureImage03} alt="" />
              <div>
                <p className="featureTag">Register</p>
                <p className="mainWord">
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </p>
                <p className="featureDescription">
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </p>
              </div>
            </figure>
          </div>
        </section>

        <section className="heroSection">
          <div className="banner">
            <div className="heroWordBox mainWord">
              믿을 수 있는 <br />
              판다마켓 중고거래
            </div>
            <img className="heroImage" src={bottomSectionImage} alt="" />
          </div>
        </section>
      </main>
      <footer>
        <div className="footerFrame">
          <div>©codeit - 2024</div>
          <div className="footerMenu">
            <a href="링크이동주소">Privacy Policy</a>
            <a href="링크이동주소">FAQ</a>
          </div>
          <div className="socialMedia">
            <a href="https://www.facebook.com/">
              <img src={facebook} alt="페이스북" width="20" />
            </a>
            <a href="https://twitter.com/">
              <img src={twitter} alt="트위터" width="20" />
            </a>
            <a href="https://www.youtube.com/">
              <img src={youtube} alt="유튜브" width="20" />
            </a>
            <a href="https://www.instagram.com/">
              <img src={instagram} alt="인스타그램" width="20" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Main;
