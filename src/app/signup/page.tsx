'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <div className="container mt-8 md:w-[640px] sm:[343px]">
        <div className="relative w-[380px] h-[120px] mb-10 mx-auto">
          <Image
            fill
            src="/images/logo.svg"
            alt="로고"
            sizes="(max-width: 640px) 380px, 120px"
          />
        </div>
        <form className="flex flex-col w-full">
          <div>
            <label
              htmlFor="email"
              className="text-gray-900 text-lg font-semibold"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              className="input mt-4 mb-6"
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="text-gray-900 text-lg font-semibold"
            >
              닉네임
            </label>
            <input
              id="username"
              className="input mt-4 mb-6"
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-900 text-lg font-semibold"
            >
              비밀번호
            </label>
            <div className="relative cursor-pointer">
              <input
                id="password"
                type="password"
                className="input mt-4 mb-6"
                placeholder="비밀번호를 입력해주세요."
              />
              <Image
                className="absolute top-8 right-6"
                src="/images/eye-on.png"
                alt="눈 켜짐"
                width={24}
                height={24}
              />
              <Image
                className="absolute top-8 right-6 hidden"
                src="/images/eye-off.png"
                alt="눈 꺼짐"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-900 text-lg font-semibold"
            >
              비밀번호 확인
            </label>
            <div className="relative cursor-pointer">
              <input
                id="password"
                type="password"
                className="input mt-4 mb-6"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
              />
              <Image
                className="absolute top-8 right-6"
                src="/images/eye-on.png"
                alt="눈 켜짐"
                width={24}
                height={24}
              />
              <Image
                className="absolute top-8 right-6 hidden"
                src="/images/eye-off.png"
                alt="눈 꺼짐"
                width={24}
                height={24}
              />
            </div>
          </div>
          <button className="rounded-full w-full h-14 bg-blue text-white text-xl font-semibold disabled:bg-gray-400">
            회원가입
          </button>
        </form>
        <div className="w-full h-[74px] bg-skyBlue rounded-lg flex justify-between p-6 my-6">
          <span className="text-gray-900">간편 로그인하기</span>
          <div className="flex gap-4 items-center">
            <div className="relative w-10 h-10">
              <Image
                fill
                className="cursor-pointer"
                src="/images/google.svg"
                alt="구글 로고"
                sizes="(max-width: 640px) 40px, 40px"
              />
            </div>
            <div className="relative w-10 h-10">
              <Image
                fill
                className="cursor-pointer"
                src="/images/kakaotalk.svg"
                alt="카카오톡 로고"
                sizes="(max-width: 640px) 40px, 40px"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm text-gray-900">이미 회원이신가요?</span>
          <Link href="/login">
            <span className="underline text-sm text-blue">로그인</span>
          </Link>
        </div>
      </div>
    </>
  );
}
