'use client';

// react, next
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// types
import { loginForm } from '@/types/auth';

// components
import AuthLogo from '@/components/auth/AuthLogo';
import AuthInput from '@/components/auth/AuthInput';
import SocialLogin from '@/components/auth/SocialLogin';
import PasswordEyeVisibility from '@/components/auth/PasswordEyeVisibility';
import AuthSubmitButton from '@/components/auth/AuthSubmitButton';

export default function Page() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginForm>({ mode: 'onChange' });

  const handleSubmitForm = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <>
      <div className="container mt-8 mb-20 md:w-[640px] sm:[343px]">
        <AuthLogo />
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <AuthInput
            name="이메일"
            id="email"
            type="email"
            errors={errors}
            register={register}
            validate={{
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            }}
          />
          <div className="relative">
            <AuthInput
              name="비밀번호"
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              errors={errors}
              register={register}
              validate={{
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다.',
                },
              }}
            />
            <div className="absolute top-[60px] right-6">
              <PasswordEyeVisibility
                passwordVisible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
            </div>
          </div>
          <AuthSubmitButton isValid={isValid} text="로그인" />
        </form>
        <SocialLogin />
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm text-gray-900">
            판다마켓이 처음이신가요?
          </span>
          <Link href="/signup">
            <span className="underline text-sm text-blue">회원가입</span>
          </Link>
        </div>
      </div>
    </>
  );
}
