import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "./Logo";
import RegisterInputField from "./RegisterInputField";
import SignButton from "./SignButton";
import SocialLogin from "../LoginPage/SocialLogin";
import "./Signup.css";
import { signup } from "../../api/api";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signup(data);
      toast.success("회원가입이 정상적으로 완료되었습니다.");
      navigate("/login");
    } catch (error: any) {
      console.error(
        "회원가입 실패:",
        error.res?.data?.message || error.message
      );
      toast.error(
        `회원가입 실패: ${
          error.response?.data?.message || "회원가입 중 오류가 발생했습니다."
        }`
      );
    }
  };

  const password = watch("password");

  return (
    <main className="sign-main">
      <section className="sign-main-box">
        <Logo />
        <section className="sub-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <RegisterInputField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
              {...register("email", {
                required: { value: true, message: "이메일을 입력해주세요" },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
            />
            <RegisterInputField
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname?.message}
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
              })}
            />
            <RegisterInputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              error={errors.password?.message}
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 입력해주세요.",
                },
              })}
            />
            <RegisterInputField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              error={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 한 번 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
            <SignButton isActive={isValid} />
          </form>
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
