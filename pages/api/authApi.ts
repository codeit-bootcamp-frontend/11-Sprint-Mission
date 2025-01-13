import { LoginInterface, SignupInterface } from "@/types/auth";

const loginAndSetToken = async ({ email, password }: LoginInterface) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (response.ok) {
      const { user, accessToken, refreshToken } = await response.json();

      // localStorage에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", user.id);

      console.log("토큰이 성공적으로 설정되었습니다.");
    } else {
      throw new Error("로그인 실패: 서버에서 인증 정보를 확인하세요.");
    }
  } catch (error) {
    console.error("초기 로그인 요청 실패:", error);
    throw error;
  }
};

const signUp = async ({ email, nickname, password }: SignupInterface) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          password,
          passwordConfirmation: password,
        }),
      }
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("초기 로그인 요청 실패:", error);
    throw error;
  }
};

export { loginAndSetToken, signUp };
