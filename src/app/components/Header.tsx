'use client';

// next
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
            <Link href="/">
              <div className="relative w-[9.5rem] h-[3.2rem]">
                <Image
                  fill
                  priority
                  src="/images/logo.svg"
                  alt="로고"
                  sizes="(max-width: 640px) 9.5rem, 9.5rem"
                />
              </div>
            </Link>
            <div className="flex gap-8 nav">
              <Link href="/board">
                <span
                  className={pathName.includes('/board') ? 'text-blue' : ''}
                >
                  자유게시판
                </span>
              </Link>
              <Link href="/items">
                <span className={pathName.includes('items') ? 'text-blue' : ''}>
                  중고마켓
                </span>
              </Link>
            </div>
          </div>
          {/* <div className="relative w-[2.5rem] h-[2.5rem]">
            <Image
              fill
              src="/images/profile.png"
              alt="프로필"
              sizes="(max-width: 640px) 2.5rem, 2.5rem"
            />
          </div> */}
          <Link href="/login">
            <button className="w-[128px] h-12 text-gray-100 rounded-lg bg-blue">
              로그인
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
