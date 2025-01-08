import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import SocialLogin from "./SocialLogin";
import SignUpLink from "./SignUpLink";
import "./Login.css";
import logo from "../../assets/image/Property 1=lg.png";
import { login } from "../../api/api";
import { useDispatch } from "react-redux";
import { check } from "../../redux/counterAccessToken";
import { setUserInfo } from "../../redux/userSlice";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onsubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem("access_token", res.accessToken);
      localStorage.setItem("refresh_token", res.refreshToken);
      dispatch(check());
      dispatch(setUserInfo(res));
      toast.success("로그인이 정상적으로 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("로그인 실패:", error.res?.data?.message || error.message);
      toast.error(
        `로그인 실패: ${
          error.response?.data?.message || "로그인 중 오류가 발생했습니다."
        }`
      );
    }
  };

  return (
    <main className="login-main">
      <section className="login-main-box">
        <section className="login-main-box-logo">
          <Link to="/">
            <img className="login-logo" src={logo} alt="판다마켓" />
          </Link>
        </section>
        <section className="sub-box">
          <form onSubmit={handleSubmit(onsubmit)}>
            <InputField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
              {...register("email", {
                required: { value: true, message: "이메일을 입력해주세요." },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "잘못된 이메일 형식입니다.",
                },
              })}
            />
            <InputField
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
            <LoginButton isActive={isValid} />
          </form>
          <SocialLogin />
          <SignUpLink />
        </section>
      </section>
    </main>
  );
};

export default Login;
