import styled from 'styled-components';

import { Container, Page } from '../styles/Common.styles';
import font from '../styles/fontStyle.styles';
import { media } from '../styles/media.styles';
import { flexColumn } from '../styles/layout.styles';

const IMG_HOME_TOP = '/img_home_top.png';
const IMG_HOME_BOTTOM = '/img_home_bottom.png';
const IMG_HOME_01 = '/Img_home_01.png';
const IMG_HOME_01_TA = '/Img_home_01_ta.png';
const IMG_HOME_02 = '/Img_home_02.png';
const IMG_HOME_02_TA = '/Img_home_02_ta.png';
const IMG_HOME_03 = '/Img_home_03.png';
const IMG_HOME_03_TA = '/Img_home_03_ta.png';

import Button from '../components/shared/Button';
import Feature from '../components/pageComponents/main/Feature';
import Footer from '../components/layout/Footer';

const features = [
  {
    images: { pc: `${IMG_HOME_01}`, ta: `${IMG_HOME_01_TA}` },
    tag: 'Hot item',
    title: { first: '인기 상품을', secound: '확인해 보세요' },
    desc: {
      first: '가장 HOT한 중고거래 물품을',
      secound: '판다 마켓에서 확인해 보세요',
    },
  },
  {
    images: { pc: `${IMG_HOME_02}`, ta: `${IMG_HOME_02_TA}` },
    tag: 'Search',
    title: { first: '구매를 원하는', secound: '상품을 검색하세요' },
    desc: {
      first: '구매하고 싶은 물품은 검색해서',
      secound: '쉽게 찾아보세요',
    },
  },
  {
    images: { pc: `${IMG_HOME_03}`, ta: `${IMG_HOME_03_TA}` },
    tag: 'Register',
    title: { first: '판매를 원하는', secound: '상품을 등록하세요' },
    desc: {
      first: '어떤 물건이든 판매하고 싶은 상품을',
      secound: '쉽게 등록하세요',
    },
  },
];

function Main() {
  return (
    <>
      <MainPage>
        <Kv>
          <MainConteiner>
            <MainKvContent>
              <h2>
                일상의 모든 물건을 <br />
                거래해 보세요
              </h2>
              <Button href='/items' color='blue' size='large' round>
                구경하러 가기
              </Button>
            </MainKvContent>
          </MainConteiner>
        </Kv>
        <MainFeaturesContainer>
          {features.map((feature) => (
            <Feature
              key={feature.tag}
              images={feature.images}
              tag={feature.tag}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </MainFeaturesContainer>
        <MainBanner>
          <MainBannerContainer>
            <p>
              믿을 수 있는 <br />
              판다마켓 중고 거래
            </p>
          </MainBannerContainer>
        </MainBanner>
        <Footer />
      </MainPage>
    </>
  );
}

export default Main;

const MainPage = styled(Page)`
  background-color: #fff;
  padding: 7rem 0 0;
  ${media.tamo`
    background-color: #fcfcfc;
  `}
`;

const MainConteiner = styled(Container)`
  display: flex;
  align-items: flex-end;
  height: 100%;
  background-image: url(${IMG_HOME_TOP});
  background-repeat: no-repeat;
  background-size: 74.6rem 34rem;
  background-position: 100% 100%;
  ${media.tamo`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-position: center 100%;
    max-width: 100%;
  `}
  ${media.mo`
    background-size: 44.8rem 20.4rem;
  `}
`;

const Kv = styled.div`
  height: 54rem;
  background-color: #cfe5ff;
  ${media.ta`
    height: 77.1rem;
  `}
`;

const MainKvContent = styled.div`
  margin-bottom: 10rem;
  ${media.tamo`
    ${flexColumn}
    align-items: center;
    margin-bottom: 0;
  `}
  ${media.ta`
    margin-top: 8.4rem;
  `}
  ${media.mo`
    margin-top: 4.8rem;
  `}
  h2 {
    ${font('40b')}
    margin-bottom: 3.2rem;
    ${media.tamo`
    text-align: center;
    `}
    ${media.ta`
      margin-bottom: 2.4rem;
      > br{
        display: none;
      }
    `}
    ${media.mo`
      margin-bottom: 1.8rem;
      ${font('32b')}
    `}
  }
`;

const MainFeaturesContainer = styled(Container)`
  ${flexColumn}
  gap: 5.2rem;
  ${media.ta`
    margin: 2.4rem auto 5.6rem;
  `}
  ${media.mo`
    margin: 5.2rem auto 8.3rem;
    gap: 4rem;
  `}
`;

const MainBanner = styled.section`
  display: flex;
  align-items: flex-end;
  background-color: #cfe5ff;
  height: 54rem;
  ${media.ta`
    height: 92.7rem; 
  `}
`;

const MainBannerContainer = styled(Container)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  background-image: url(${IMG_HOME_BOTTOM});
  background-repeat: no-repeat;
  background-size: 74.6rem 39.7rem;
  background-position: 100% 100%;
  ${media.tamo`
    align-items: center;
    flex-direction: column;
    height: 100%;
    background-position: center 100%;
    max-width: 100%;
  `}
  ${media.mo`
    background-size: 37.5rem 19.8rem; 
  `}
  p {
    white-space: nowrap;
    ${font('40b')}
    margin-bottom: 17.25rem;
    ${media.tamo`
      text-align: center;
      margin-bottom: 0;
    `}
    ${media.ta`
      margin-top: 20.1rem; 
    `}
    ${media.mo`
      margin-top: 12.1rem; 
      ${font('32b')}
    `}
  }
`;
