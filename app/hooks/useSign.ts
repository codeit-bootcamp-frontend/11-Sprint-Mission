"use client";

import { useState } from "react";

export default function useSign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (value: string) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      value
    );
    setEmailError(
      !value
        ? "이메일을 입력해 주세요"
        : isValid
        ? ""
        : "잘못된 이메일 형식입니다"
    );
    return isValid;
  };

  const validatePassword = (value: string) => {
    const isValid = value.length >= 8;
    setPasswordError(
      !value
        ? "비밀번호를 입력해 주세요"
        : isValid
        ? ""
        : "비밀번호를 8자 이상 입력해주세요"
    );
    return isValid;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const isEmailValid = validateEmail(value);
    const isPasswordValid = validatePassword(password);
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const isPasswordValid = validatePassword(value);
    const isEmailValid = validateEmail(email);
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  return {
    email,
    setEmail: handleEmailChange,
    password,
    setPassword: handlePasswordChange,
    emailError,
    passwordError,
    isFormValid,
  };
}
