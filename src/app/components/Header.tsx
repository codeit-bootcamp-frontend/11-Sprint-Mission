'use client';

// react, next
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// context
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [dropLogout, setDropLogout] = useState<boolean>(false);

  const pathName: string = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <div className="w-100% mx-auto border-b">
        <div className="h-[70px] flex justify-between items-center container relative">
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
          {user ? (
            <div
              className="relative w-[2.5rem] h-[2.5rem] cursor-pointer"
              tabIndex={0}
              onMouseOver={() => setDropLogout(!dropLogout)}
            >
              <Image
                fill
                src="/images/profile.png"
                alt="프로필"
                sizes="(max-width: 640px) 2.5rem, 2.5rem"
              />
            </div>
          ) : (
            <Link href="/login">
              <button className="w-[128px] h-12 text-gray-100 rounded-lg bg-blue">
                로그인
              </button>
            </Link>
          )}
          {dropLogout && user && (
            <button
              className="absolute right-0 top-[60px] border bg-white w-[140px] h-[50px] rounded-lg"
              onMouseOut={() => setDropLogout(false)}
              onClick={() => logout()}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </>
  );
}
