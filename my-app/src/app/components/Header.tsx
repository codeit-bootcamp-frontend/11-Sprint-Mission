import Image from "next/image";
import Link from "next/link";

export default function HeaderContainer() {
  return (
    <header className="w-full border-b-2 border-solid border-bordergray fixed top-0 left-0 right-0 py-0 px-4 md:px-6 bg-background z-50">
      <div className="w-full max-w-[1440px] h-[70px] mx-auto flex items-center ">
        <div className="mr-[8px] lg:mr-[47px] md:mr-[37px] ">
          <Link
            className="flex justify-between items-center gap-[8px]"
            href={"/"}
          >
            <div className="w-[40px] h-[40px] relative hidden md:block">
              <Image src="/head/logo_face.png" fill alt="logo_face" />
            </div>
            <div className="w-[103px] h-[25px] relative ">
              <Image src="/head/logo_txt.png" fill alt="logo_text" />
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 items-center md:gap-[30px] gap-[8px]">
          <Link className="md:text-lg text-gray600 font-bold" href="/boards">
            자유게시판
          </Link>
          <Link className="md:text-lg text-gray600 font-bold" href="/">
            중고마켓
          </Link>
        </nav>
        <div className="w-[40px] h-[40px] relative">
          <Link href={"/login"}>
            <Image src="/head/myPageIcon.png" fill alt="myPageIcon" />
          </Link>
        </div>
      </div>
    </header>
  );
}
