"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthFormProps } from "../type/type";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup, login } from "../api/api";

export default function CommonForm({ type }: AuthFormProps) {
  const isLogin = type === "login";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repassword, setRePassword] = useState("");
  const [repasswordError, setRePasswordError] = useState("");
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const [nicknameError, setNicknameError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태 추가
  const [showRePassword, setShowRePassword] = useState(false); // 비밀번호 확인 보이기 상태 추가
  const router = useRouter();

  useEffect(() => {}, [email, nickname, password, repassword]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (type === "signup") {
        const signupData = {
          email,
          nickname,
          password,
          passwordConfirmation: repassword,
        };
        await signup(signupData); // 회원가입 API 호출
        router.push("/login");
        alert("회원가입 성공!");
      } else if (type === "login") {
        const loginData = {
          email,
          password,
        };
        const data = await login(loginData); // 로그인 API 호출
        localStorage.setItem("token", data.token); // 토큰 저장
        router.push("/item");
        alert("로그인 성공!");
      }
    } catch (error: any) {
      console.error(
        `${type} 오류:`,
        error.response?.data?.message || error.message || error
      ); // 구체적인 오류 메시지 확인
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "알 수 없는 오류가 발생했습니다."; // error.message가 없으면 기본 메시지 제공
      alert(errorMessage); // 사용자에게 오류 메시지 알림
    }
  };
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("이메일을 입력해주세요");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요");
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자리 이상이어야 합니다");
    } else {
      setPasswordError("");
    }
  };
  const validateRePassword = (repassword: string, password: string) => {
    if (!repassword) {
      setRePasswordError("비밀번호를 다시 한 번 입력해주세요");
    } else if (repassword !== password) {
      setRePasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setRePasswordError("");
    }
  };

  // 이메일 입력 변경 시 에러 메시지 제거
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(""); // 실시간으로 에러 메시지 제거
    validateEmail(e.target.value); // 실시간 이메일 유효성 검사
  };

  // 비밀번호 입력 변경 시 에러 메시지 제거
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(""); // 실시간으로 에러 메시지 제거
    validatePassword(e.target.value); // 실시간 비밀번호 유효성 검사
  };

  // 비밀번호 입력 변경 시 에러 메시지 제거
  const handleRePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePassword(e.target.value);
    setRePasswordError(""); // 실시간으로 에러 메시지 제거
    validateRePassword(e.target.value, password); // 실시간 비밀번호 확인 유효성 검사
  };

  // 닉네임 입력 변경 시
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError("");
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevState) => !prevState); // 비밀번호 보이기/숨기기 상태 토글
  };

  const handleRePasswordVisibilityToggle = () => {
    setShowRePassword((prevState) => !prevState); // 비밀번호 확인 보이기/숨기기 상태 토글
  };
  return (
    <>
      <div className={`mt-[80px] ${isLogin ? "md:mt-[140px]" : ""}`}>
        <div className="flex flex-col items-center pl-[16px] pr-[16px]">
          <div className="w-full">
            <Link
              className="w-full flex items-center justify-center gap-[11px]"
              href={"/"}
            >
              <div className="w-full h-auto max-w-[51px] md:max-w-[103px]">
                <Image
                  className="object-contain"
                  src="/head/logo_face.png"
                  alt="로고"
                  width={104}
                  height={105}
                />
              </div>
              <div className="w-full h-auto max-w-[133px] md:max-w-[259px]">
                <Image
                  className="object-contain"
                  src="/head/logo_txt.png"
                  alt="로고"
                  width={259}
                  height={64}
                />
              </div>
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="mt-[60px]">
            <div className="w-[343px] md:w-[640px] flex flex-col gap-[16px] md:gap-[24px]">
              <div className="flex flex-col">
                <label className="mb-[8px]" htmlFor="pandaEmail">
                  이메일
                </label>
                <input
                  className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  id="pandaEmail"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                <div className="text-red">{emailError}</div>
              </div>
              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-[8px]" htmlFor="pandaName">
                    닉네임
                  </label>
                  <input
                    className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                    type="text"
                    placeholder="닉네임"
                    id="pandaName"
                    value={nickname}
                    onChange={handleNicknameChange}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col">
                <label className="mb-[8px]" htmlFor="pandaPassword">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요"
                    id="pandaPassword"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <div className="absolute top-1/2 right-6 w-[22px] h-[19px] transform -translate-y-1/2 ">
                    <div
                      className="w-full h-auto max-w-[22px] absolute opacity-1 pointer-events-auto"
                      onClick={handlePasswordVisibilityToggle}
                    >
                      <Image
                        className="object-contain"
                        src={
                          showPassword
                            ? "/icon/visible.png"
                            : "/icon/visibility.png"
                        }
                        alt="클릭시비밀번호보기"
                        width={22}
                        height={19}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-red">{passwordError}</div>
              </div>
              {!isLogin && (
                <div className="flex flex-col">
                  <label className="mb-[8px]" htmlFor="repandaPassword">
                    비밀번호 확인
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-[56px] bg-gray100 pl-[24px] rounded-[12px]"
                      type={showRePassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 한 번 입력해주세요"
                      id="repandaPassword"
                      value={repassword}
                      onChange={handleRePasswordChange}
                      required
                    />
                    <div
                      className="absolute top-1/2 right-6 w-[22px] h-[19px] transform -translate-y-1/2"
                      onClick={handleRePasswordVisibilityToggle}
                    >
                      <Image
                        className="object-contain"
                        src={
                          showRePassword
                            ? "/icon/visible.png"
                            : "/icon/visibility.png"
                        }
                        alt="클릭시비밀번호보기"
                        width={22}
                        height={19}
                      />
                    </div>
                  </div>
                  <div className="text-red">{repasswordError}</div>
                </div>
              )}
              <button
                type="submit"
                className="w-full h-[56px] text-center text-background text-[20px] text-gray100 bg-gray400 rounded-[40px]"
                disabled={
                  !!emailError ||
                  !!passwordError ||
                  (!isLogin && (!!nicknameError || !!repasswordError))
                }
              >
                {isLogin ? "로그인" : "회원가입"}
              </button>

              <div className="flex justify-between items-center w-full h-[74px] bg-mainbg rounded-[8px] pl-[24px] pr-[24px]">
                <p className="w-full">간편 로그인하기</p>
                <div className="w-full flex justify-end gap-[16px]">
                  <div className="w-[42px] h-[42px] rounded-full relative bg-background">
                    <Link
                      className="w-[22px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      href="https://www.google.com/"
                    >
                      <Image
                        className="object-contain"
                        src="/icon/google.png"
                        alt="구글로고"
                        width={22}
                        height={22}
                      />
                    </Link>
                  </div>
                  <div className="w-[42px] h-[42px] rounded-full relative bg-background">
                    <Link
                      className="w-[22px] h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      href="https://www.kakaocorp.com/page/"
                    >
                      <Image
                        className="object-contain"
                        src="/icon/kakao.png"
                        alt="카카오톡로고"
                        width={26}
                        height={24}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-[4px]">
                <span className="text-[14px]">
                  {isLogin ? "판다마켓이 처음이신가요?" : "이미 회원이신가요?"}
                </span>
                <Link
                  className="text-skyblue"
                  href={isLogin ? "/signup" : "/login"}
                >
                  {isLogin ? "회원가입" : "로그인"}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
