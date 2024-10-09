import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/style.css";
import "../styles/home.css";
import imgHomeTop from "../images/img_home_top.png";
import imgHome01 from "../images/img_home_01.png";
import imgHome02 from "../images/img_home_02.png";
import imgHome03 from "../images/img_home_03.png";
import imgHomeBottom from "../images/img_home_bottom.png";

const Home = () => {
  return (
    <div>
      <Header isLogin={false} />
      <main>
        <section className="intro">
          <div>
            <div className="intro-container">
              <h2>
                일상의 모든 물건을 <br className="responsive-break" />
                거래해 보세요
              </h2>
              <Link to={"/items"}>구경하러 가기</Link>
            </div>
            <img src={imgHomeTop} alt="홈페이지 상단 이미지" />
          </div>
        </section>
        <section className="cards">
          <div className="card">
            <img src={imgHome01} alt="인기 상품 기능을 소개하는 카드 이미지" />
            <div className="card-content">
              <p className="card-subtitle">Hot item</p>
              <h2 className="card-title">
                인기 상품을 <br className="responsive-break" />
                확인해 보세요
              </h2>
              <p className="card-text">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
          <div className="card">
            <img src={imgHome02} alt="상품 검색 기능을 소개하는 카드 이미지" />
            <div className="card-content">
              <p className="card-subtitle">Search</p>
              <h2 className="card-title">
                구매를 원하는 <br className="responsive-break" />
                상품을 검색하세요
              </h2>
              <p className="card-text">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
          <div className="card">
            <img src={imgHome03} alt="상품 등록 기능을 소개하는 카드 이미지" />
            <div className="card-content">
              <p className="card-subtitle">Register</p>
              <h2 className="card-title">
                판매를 원하는 <br className="responsive-break" />
                상품을 등록하세요
              </h2>
              <p className="card-text">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>
        <section className="last">
          <div>
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>
            <img src={imgHomeBottom} alt="홈페이지 하단 이미지" />
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer">
          <p>©codeit - 2024</p>
          <div className="support">
            <a href="privacy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
          </div>
          <div className="ic-sns">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sns"
            >
              <img
                src="images/ic_facebook.svg"
                alt="페이스북 로고 - 페이스북 페이지로 이동"
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sns"
            >
              <img
                src="images/ic_twitter.svg"
                alt="트위터 로고 - 트위터 페이지로 이동"
              />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sns"
            >
              <img
                src="images/ic_youtube.svg"
                alt="유튜브 로고 - 유튜브 페이지로 이동"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="sns"
            >
              <img
                src="images/ic_instagram.svg"
                alt="인스타그램 로고 - 인스타그램 페이지로 이동"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
