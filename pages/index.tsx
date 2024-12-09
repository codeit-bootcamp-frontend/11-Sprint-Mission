import Link from "next/link";
import styles from "@/styles/index.module.css";
import topImg from "@/public/svgs/Img_home_top.svg";
import Image from "next/image";
import hotImg from "@/public/pngs/Img_home_01.png";
import searchImg from "@/public/pngs/Img_home_02.png";
import registerImg from "@/public/pngs/Img_home_03.png";
import bottomImg from "@/public/pngs/Img_home_bottom.png";
import facebook from "@/public/svgs/ic_facebook.svg";
import twitter from "@/public/svgs/ic_twitter.svg";
import youtube from "@/public/svgs/ic_youtube.svg";
import instagram from "@/public/svgs/ic_instagram.svg";
import MainNav from "@/components/MainNav";

Home.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <MainNav />
      {page}
    </>
  );
};

export default function Home<NextPageWithLayout>() {
  return (
    <div className={styles.body}>
      <div className={styles.body1}>
        <section className={styles.header}>
          <div className={styles.header_container}>
            <div className={styles.header_banner}>
              <p className={styles.header_description}>
                일상의 모든 물건을
                <br />
                거래해 보세요
              </p>
              <Link href={"/items"} className={styles.link}>
                <button className={styles.btn_catalog}>구경하러 가기</button>
              </Link>
            </div>
            <Image
              className={styles.header_image}
              src={topImg}
              alt="상단 배너 이미지"
            />
          </div>
        </section>
        <section className={styles.section_container}>
          <div className={styles.section_hotitem}>
            <div className={styles.section_banner}>
              <Image
                className={styles.section_hotitem_image}
                src={hotImg}
                alt="hot item 이미지"
              />
              <div className={styles.section_hotitem_container}>
                <div className={styles.section_title}>Hot item</div>
                <div className={styles.section_hotitem_description}>
                  <p className={styles.section_hotitem_description_Bold}>
                    인기 상품을 확인해 보세요
                  </p>
                  <p className={styles.section_hotitem_description_regular}>
                    가장 HOT한 중고거래 물품을
                    <br />
                    판다 마켓에서 확인해보세요
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section_search}>
            <div className={styles.section_banner}>
              <div className={styles.section_search_container}>
                <div className={styles.section_title}>Search</div>
                <div className={styles.section_search_description}>
                  <p className={styles.section_search_description_Bold}>
                    구매를 원하는 상품을 검색하세요
                  </p>
                  <p className={styles.section_search_description_regular}>
                    구매하고 싶은 물품은 검색해서
                    <br />
                    쉽게 찾아보세요
                  </p>
                </div>
              </div>
              <Image
                className={styles.section_search_image}
                src={searchImg}
                alt="search 이미지"
              />
            </div>
          </div>
          <div className={styles.section_register}>
            <div className={styles.section_banner}>
              <Image
                className={styles.section_register_image}
                src={registerImg}
                alt="register 이미지"
              />
              <div className={styles.section_register_container}>
                <div className={styles.section_title}>Register</div>
                <div className={styles.section_register_description}>
                  <p className={styles.section_register_description_Bold}>
                    판매를 원하는 상품을 등록하세요
                  </p>
                  <p className={styles.section_register_description_regular}>
                    어떤 물건이든 판매하고 싶은 상품을
                    <br />
                    쉽게 등록하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.bottom}>
          <div className={styles.bottom_container}>
            <div className={styles.bottom_banner}>
              <p className={styles.bottom_description}>
                믿을 수 있는
                <br />
                판다마켓 중고 거래
              </p>
            </div>
            <Image
              className={styles.bottom_image}
              src={bottomImg}
              alt="하단 배너 이미지"
            />
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footer_container}>
            <p className={styles.footer_codeit}>©codeit - 2024</p>
            <div className={styles.footer_Privacy_FAQ}>
              <Link className={styles.footer_privacy} href="privacy.html">
                Privacy Policy
              </Link>
              <Link className={styles.footer_FAQ} href="faq.html">
                FAQ
              </Link>
            </div>
            <div className={styles.footer_sns}>
              <Link href="https://www.facebook.com/" target="_blank">
                <Image
                  className={styles.facebook}
                  src={facebook}
                  alt="페이스북 링크"
                />
              </Link>
              <Link href="https://x.com/" target="_blank">
                <Image
                  className={styles.twitter}
                  src={twitter}
                  alt="트위터 링크"
                />
              </Link>
              <Link href="https://www.youtube.com/" target="_blank">
                <Image
                  className={styles.youtube}
                  src={youtube}
                  alt="유튜브 링크"
                />
              </Link>
              <Link href="https://www.instagram.com/" target="_blank">
                <Image
                  className={styles.instagram}
                  src={instagram}
                  alt="인스타그램 링크"
                />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
