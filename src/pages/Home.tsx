import { NavLink } from "react-router-dom";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className='section-layout section-layout-bg top'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <h2 className='section-title'>
                  일상의 모든 물건을
                  <br />
                  거래해 보세요
                </h2>
                <NavLink
                  to='/items'
                  className='link-item'
                  title='아이템 페이지 이동'
                >
                  구경하러 가기
                </NavLink>
              </div>
              <img
                src='/images/home/img_home_top.png'
                className='img-home top'
                alt='일상의 모든 물건을 거래해 보세요'
              />
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <img
                className='img-pc'
                src='/images/home/img_home_01.png'
                alt='Hot item 이미지'
              />
              <img
                className='img-tablet'
                src='/images/home/img_home_01_tablet.png'
                alt='Hot item 이미지'
              />
              <img
                className='img-mobile'
                src='/images/home/img_home_01_mobile.png'
                alt='Hot item 이미지'
              />
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Hot item</span>
                  <h2 className='section-title'>
                    인기 상품을
                    <br />
                    확인해 보세요
                  </h2>
                  <p className='section-desc'>
                    가장 HOT한 중고거래 물품을
                    <br />
                    판다 마켓에서 확인해 보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Search</span>
                  <h2 className='section-title'>
                    구매를 원하는
                    <br />
                    상품을 검색하세요
                  </h2>
                  <p className='section-desc'>
                    구매하고 싶은 물품은 검색해서
                    <br />
                    쉽게 찾아보세요
                  </p>
                </div>
              </div>
              <img
                className='img-pc'
                src='/images/home/img_home_02.png'
                alt='Search 이미지'
              />
              <img
                className='img-tablet'
                src='/images/home/img_home_02_tablet.png'
                alt='Search 이미지'
              />
              <img
                className='img-mobile'
                src='/images/home/img_home_02_mobile.png'
                alt='Search 이미지'
              />
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-card'>
          <div className='section-wrap'>
            <div className='section-content'>
              <img
                className='img-pc'
                src='/images/home/img_home_03.png'
                alt='Register 이미지'
              />
              <img
                className='img-tablet'
                src='/images/home/img_home_03_tablet.png'
                alt='Register 이미지'
              />
              <img
                className='img-mobile'
                src='/images/home/img_home_03_mobile.png'
                alt='Register 이미지'
              />
              <div className='section-content-inner'>
                <div>
                  <span className='badge'>Register</span>
                  <h2 className='section-title'>
                    판매를 원하는
                    <br />
                    상품을 등록하세요
                  </h2>
                  <p className='section-desc'>
                    어떤 물건이든 판매하고 싶은 상품을
                    <br />
                    쉽게 등록하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-layout section-layout-bg bottom'>
          <div className='section-wrap'>
            <div className='section-content'>
              <div className='section-content-inner'>
                <h2 className='section-title mb-60'>
                  믿을 수 있는
                  <br />
                  판다마켓 중고 거래
                </h2>
              </div>
              <img
                src='/images/home/img_home_bottom.png'
                className='img-home bottom'
                alt='믿을 수 있는 판다마켓 중고 거래'
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
