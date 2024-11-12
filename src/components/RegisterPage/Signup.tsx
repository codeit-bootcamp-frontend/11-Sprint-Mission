import React, { ChangeEvent, useState } from "react";
import Logo from "./Logo";
import RegisterInputField from "./RegisterInputField";
import SignButton from "./SignButton";
import SocialLogin from "../LoginPage/SocialLogin";
import "./Signup.css";

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateField(name as keyof FormValues, value);
  };

  const handleRegisterButtonClick = () => {
    if (!formValues.email)
      setErrors((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
    if (!formValues.username)
      setErrors((prev) => ({ ...prev, username: "닉네임을 입력해주세요." }));
    if (!formValues.password)
      setErrors((prev) => ({ ...prev, password: "비밀번호를 입력해주세요." }));
    if (!formValues.confirmPassword)
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "비밀번호를 다시 입력해주세요.",
      }));
  };

  const validateField = (name: keyof FormValues, value: string) => {
    let errorMsg = "";

    if (name === "email") {
      if (!value) errorMsg = "이메일을 입력해주세요.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        errorMsg = "잘못된 이메일 형식입니다.";
    } else if (name === "username") {
      if (!value) errorMsg = "닉네임을 입력해주세요.";
    } else if (name === "password") {
      if (!value) errorMsg = "비밀번호를 입력해주세요.";
      else if (value.length < 8) errorMsg = "비밀번호를 8자 이상 입력해주세요.";
    } else if (name === "confirmPassword") {
      if (!value) errorMsg = "비밀번호를 다시 한 번 입력해주세요.";
      else if (value !== formValues.password)
        errorMsg = "비밀번호가 일치하지 않습니다.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const isFormValid =
    Object.values(errors).every((err) => !err) &&
    Object.values(formValues).every((val) => val);

  return (
    <main className="sign-main">
      <section className="sign-main-box">
        <Logo />
        <section className="sub-box">
          <RegisterInputField
            label="이메일"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={formValues.email}
            onChange={handleChange}
            error={errors.email}
          />
          <RegisterInputField
            label="닉네임"
            type="text"
            name="username"
            placeholder="닉네임을 입력해주세요"
            value={formValues.username}
            onChange={handleChange}
            error={errors.username}
          />
          <RegisterInputField
            label="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={formValues.password}
            onChange={handleChange}
            error={errors.password}
          />
          <RegisterInputField
            label="비밀번호 확인"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <SignButton
            isActive={isFormValid}
            onClick={handleRegisterButtonClick}
          />
          <SocialLogin />
          <p className="to-signup">
            이미 회원이신가요?
            <a className="to-signup-link" href="/login">
              로그인
            </a>
          </p>
        </section>
      </section>
    </main>
  );
};

export default Signup;
