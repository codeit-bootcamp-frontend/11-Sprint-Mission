"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoPandaPc from "@icons/ic_logo_panda_tablet.svg";
import logoPandaMobile from "@icons/ic_logo_panda_mobile.svg";
import myProfile from "@icons/ic_my_profile.png";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-4 tablet:px-6 pc:px-[200px] py-2">
      <div className="flex items-center gap-2 tablet:gap-[30px]">
        <div>
          <Link href="/">
            <Image
              src={logoPandaMobile}
              alt="메인으로 가기"
              width={81}
              height={40}
              className="block tablet:hidden"
            />
            <Image
              src={logoPandaPc}
              alt="메인으로 가기"
              width={153}
              height={51}
              className="hidden tablet:block"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 tablet:gap-[35px] pc:gap-[42px]">
          <Link
            href="/boards"
            className={`font-bold text-[16px] tablet:text-[18px] ${
              pathname?.startsWith("/boards")
                ? "text-primary_100"
                : "hover:text-primary_100"
            }`}
          >
            자유게시판
          </Link>
          <Link
            href="/items"
            className={`font-bold text-[16px] tablet:text-[18px] ${
              pathname?.startsWith("/items")
                ? "text-primary_100"
                : "hover:text-primary_100"
            }`}
          >
            중고마켓
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={myProfile}
          alt="마이페이지"
          width={40}
          height={40}
        />
      </div>
    </header>
  );
}
