'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const pathName: string = usePathname();

  return (
    <>
      <div className="w-100% mx-auto border-b">
        <div className="h-[70px] flex justify-between items-center container">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="relative w-[9.5rem] h-[3.2rem]">
              <Link href="/">
                <Image fill src="/images/logo.svg" alt="로고" />
              </Link>
            </div>
            <div className="flex gap-8 nav">
              <Link href="/board">
                <span className={pathName === '/board' ? 'text-blue' : ''}>
                  자유게시판
                </span>
              </Link>
              <Link href="/items">
                <span className={pathName === '/items' ? 'text-blue' : ''}>
                  중고마켓
                </span>
              </Link>
            </div>
          </div>
          <div className="relative w-[2.5rem] h-[2.5rem]">
            <Image fill src="/images/profile.png" alt="프로필" />
          </div>
        </div>
      </div>
    </>
  );
}
