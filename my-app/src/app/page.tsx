import Image from "next/image";
import Link from "next/link";
import MainCard from "./components/MainCard";
import { Mcard } from "./type/type";

export default function Home() {
  const items: Mcard[] = [
    {
      imgSrc: "/Img_home_01.png",
      alt: "이미지 1",
      title: "Hot item",
      description1: "인기 상품을 확인해 보세요",
      description2: "가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요",
      isSpecial: false, // 특정 스타일 적용 여부
    },
    {
      imgSrc: "/Img_home_02.png",
      alt: "이미지 2",
      title: "Search",
      description1: "새로운 거래를 찾아보세요",
      description2: "다양한 물품과 거래를 경험해 보세요",
      isSpecial: true, // 다른 CSS 적용
    },
    {
      imgSrc: "/Img_home_03.png",
      alt: "이미지 3",
      title: "register",
      description1: "최저가 물품을 찾으세요",
      description2: "합리적인 가격으로 물건을 구매하세요",
      isSpecial: false,
    },
  ];
  return (
    <>
      <section className="w-full h-[540px] bg-mainbg relative">
        <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="md:max-w-[1100px] md:mx-auto w-full h-full flex flex-col md:flex-row justify-between items-center gap-[132px] md:gap-0">
            <div className="max-w-[240px] md:!max-w-[357px] w-full h-full flex flex-col items-center gap-[18px] md:block">
              <p className="text-center md:text-left text-[32px] leading-[48px] font-bold md:mb-[32px]">
                일상의 모든 물건을
                <br className="t-pc-br" /> 거래해 보세요
              </p>
              <button className="w-full h-[48px] bg-skyblue rounded-[40px]">
                <Link
                  className="w-full inline-block text-background text-[18px] font-semibold"
                  href="/item"
                >
                  구경하러가기
                </Link>
              </button>
            </div>
            <div className="w-full h-auto md:max-w-[746px]">
              <Image
                src="/Img_home_top.png"
                alt="탑이미지"
                layout="responsive"
                width={746}
                height={340}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-[24px] lg:pt-[138px] pr-[24px] 2xl:pr-[466px]  pb-[56px] lg:pb-[138px] pl-[24px] 2xl:pl-[466px]">
        <div className="lg:flex lg:flex-col lg:gap-[276px] ">
          {items.map((item, index) => (
            <MainCard
              key={index}
              imgSrc={item.imgSrc}
              alt={item.alt}
              title={item.title}
              description1={item.description1}
              description2={item.description2}
              isSpecial={item.isSpecial}
            />
          ))}
        </div>
      </section>
      <div className="w-full h-[540px] md:h-[927px] lg:h-[540px] bg-mainbg relative">
        <div className="w-full md:max-w-[1100px] flex flex-col md:flex-row items-center gap-[131px] absolute bottom-0 md:left-1/2 md:-translate-x-1/2">
          <p className="text-center text-[32px] font-bold leading-[45px]">
            믿을 수 있는
            <br /> 판다마켓 중고 거래
          </p>
          <div className="w-full h-auto md:max-w-[746px] ">
            <Image
              src="/Img_home_bottom.png"
              alt="바텀이미지"
              layout="responsive"
              width={746}
              height={340}
            />
          </div>
        </div>
      </div>
      <footer className="bg-ftbg">
        <div className="flex pl-[16px] 2xl:pl-[400px] pt-[32px] pr-[16px] 2xl:pr-[400px] pb-[65px] gap-[68px] md:justify-between">
          <div className="flex flex-col-reverse md:flex-row gap-[25px] lg:gap-[365px]">
            <p className="text-background">©codeit - 2024</p>
            <div className="flex gap-[30px]">
              <p className="text-background">Privacy Policy</p>
              <p className="text-background">FAQ</p>
            </div>
          </div>
          <div className="flex gap-[12px]">
            <Link
              className="w-[20px] h-[20px] inline-block relative"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <Image src="/icon/ic_facebook.png" alt="페이스북로고" fill />
            </Link>
            <Link
              className="w-[20px] h-[20px] inline-block relative"
              href="https://x.com/"
              target="_blank"
            >
              <Image src="/icon/ic_twitter.png" alt="페이스북로고" fill />
            </Link>
            <Link
              className="w-[20px] h-[20px] inline-block relative"
              href="https://www.youtube.com/"
              target="_blank"
            >
              <Image src="/icon/ic_youtube.png" alt="페이스북로고" fill />
            </Link>
            <Link
              className="w-[20px] h-[20px] inline-block relative"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <Image src="/icon/ic_instagram.png" alt="페이스북로고" fill />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
