'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { signUpForm } from '@/types/auth';

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<signUpForm>({ mode: 'onChange' });

  const password = watch('password');

  const preventSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\s/g, '');
  };

  const handlePreventSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordConfirmationVisibility = () => {
    setPasswordConfirmationVisible((prev) => !prev);
  };

  const handleSubmitForm = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <>
      <div className="container mt-8 mb-20 md:w-[640px] sm:[343px]">
        <div className="relative w-[380px] h-[120px] mb-10 mx-auto">
          <Link href="/">
            <Image
              fill
              src="/images/logo.svg"
              alt="로고"
              sizes="(max-width: 640px) 380px, 120px"
            />
          </Link>
        </div>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
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
              onInput={preventSpace}
              onKeyDown={handlePreventSpace}
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 형식이 아닙니다.',
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 mb-5 mt-[-10px] block">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="nickname"
              className="text-gray-900 text-lg font-semibold"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              className="input mt-4 mb-6"
              placeholder="닉네임을 입력해주세요."
              onInput={preventSpace}
              onKeyDown={handlePreventSpace}
              {...register('nickname', {
                required: '닉네임을 입력해주세요.',
              })}
            />
            {errors.nickname && (
              <span className="text-red-600 mb-5 mt-[-10px] block">
                {errors.nickname.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-900 text-lg font-semibold"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                className="input mt-4 mb-6"
                placeholder="비밀번호를 입력해주세요."
                onInput={preventSpace}
                onKeyDown={handlePreventSpace}
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 8자 이상이어야 합니다.',
                  },
                })}
              />
              <Image
                className="absolute top-8 right-6 cursor-pointer"
                src={
                  passwordVisible ? '/images/eye-off.png' : '/images/eye-on.png'
                }
                alt="눈 모양"
                width={24}
                height={24}
                onClick={handlePasswordVisibility}
              />
              {errors.password && (
                <span className="text-red-600 mb-5 mt-[-10px] block">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="passwordConfirmation"
              className="text-gray-900 text-lg font-semibold"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                id="passwordConfirmation"
                type={passwordConfirmationVisible ? 'text' : 'password'}
                className="input mt-4 mb-6"
                placeholder="비밀번호를 입력해주세요."
                onInput={preventSpace}
                onKeyDown={handlePreventSpace}
                {...register('passwordConfirmation', {
                  required: '비밀번호를 입력해주세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
              <Image
                className="absolute top-8 right-6 cursor-pointer"
                src={
                  passwordConfirmationVisible
                    ? '/images/eye-off.png'
                    : '/images/eye-on.png'
                }
                alt="눈 모양"
                width={24}
                height={24}
                onClick={handlePasswordConfirmationVisibility}
              />
              {errors.passwordConfirmation && (
                <span className="text-red-600 mb-5 mt-[-10px] block">
                  {errors.passwordConfirmation.message}
                </span>
              )}
            </div>
          </div>
          <button
            className="mt-4 rounded-full w-full h-14 bg-blue text-white text-xl font-semibold disabled:bg-gray-400"
            disabled={!isValid}
          >
            로그인
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
