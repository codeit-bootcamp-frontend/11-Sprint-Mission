import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/ic_logo.svg';
import homeTop from '@/public/img_home_top.png';
import firstSection from '@/public/img_first_main_section.png';
import secondSection from '@/public/img_second_main_section.png';
import thirdSection from '@/public/img_third_main_section.png';
import homeBottom from '@/public/img_home_bottom.png';
import facebook from '@/public/ic_facebook.svg';
import twitter from '@/public/ic_twitter.svg';
import instagram from '@/public/ic_instagram.svg';
import youtube from '@/public/ic_youtube.svg';

export default function Home() {
  return (
    <>
    {/* <body>
      <header> */}
        <div className="head">
          <div className="logo">
            <Image src={logo} alt="로고" />
            <Link href="/" className="title">
              판다마켓
            </Link>
          </div>
          <Link href="/login" className="button small-button">
            로그인
          </Link>
        </div>
      {/* </header> */}

      <div className="home">
        <div className="top">
          <div className="top-content">
            <h2>
              <div className="top-text">
                일상의 모든 물건을 <br />
              </div>
              <div className="top-text">거래해 보세요</div>
            </h2>
            <Link href="/items" className="button large-button">
              구경하러 가기
            </Link>
          </div>
          <Image src={homeTop} alt="거래하는 판다" />
        </div>
      </div>
      <section>
        <div className="section">
          <Image src={firstSection} alt="인기 상품 확인하기" />
          <div className="section-image">
            <span>Hot item</span>
            <div className="section-text">
              <h3>
                인기 상품을
                <br />
                확인해 보세요
              </h3>
              <div>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="section reverse">
          <div className="section-image reverse">
            <span>Search</span>
            <div className="section-text reverse">
              <h3>
                구매를 원하는
                <br />
                상품을 검색하세요
              </h3>
              <div>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </div>
            </div>
          </div>
          <Image src={secondSection} alt="원하는 상품 검색하기" />
        </div>
      </section>
      <section>
        <div className="section">
          <Image src={thirdSection} alt="상품 등록하기" />
          <div className="section-image">
            <span>Resister</span>
            <div className="section-text">
              <h3>
                판매를 원하는
                <br />
                상품을 등록하세요
              </h3>
              <div>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="home">
        <div className="bottom">
          <div className="bottom-content">
            <h2>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h2>
          </div>
          <Image src={homeBottom} alt="판다마켓에서 거래하기" />
        </div>
      </div>
      <footer>
        <div className="footer-auth">
          <div className="auth__copyright">©codeit - 2024</div>
          <div className="auth__info">
            <div className="auth__privacy">Privacy Policy</div>
            <div className="auth__faq">FAQ</div>
          </div>
          <div className="auth__sns">
            <Link href="https://ko-kr.facebook.com/" target="_blank">
              <Image src={facebook} alt="페이스북" />
            </Link>
            <Link href="https://x.com/" target="_blank">
              <Image src={twitter} alt="트위터" />
            </Link>
            <Link href="https://www.youtube.com/" target="_blank">
              <Image src={youtube} alt="유튜브" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank">
              <Image src={instagram} alt="인스타그램" />
            </Link>
          </div>
        </div>
      </footer>
    {/* </body> */}
    </>
  );
}
