import { postRefresh } from "@/api/auth.api";
import getElapsedTime from "./getElapsedTime";
import { setInstanceHeaders } from "@/api/axios";

const DEFAULT_MAX_AGE = 1800;

export default async function renewAccessToken(
  maxAge: number = DEFAULT_MAX_AGE
) {
  const birth = sessionStorage.getItem("birth");
  if (!birth) {
    console.log("renewAccessToken : 로그인하지 않음");
    return;
  }

  const lapse = getElapsedTime(birth);
  if (lapse < maxAge) {
    console.log("renewAccessToken : 토큰 수명을 초과하지 않음");
    return;
  }

  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.log("renewAccessToken : 갱신 토큰이 존재하지 않음");
    return;
  }

  try {
    const response = await postRefresh(refreshToken);
    sessionStorage.setItem("accessToken", response.accessToken);
    setInstanceHeaders(response.accessToken);
    console.log("renewAccessToken : 접근 토큰 갱신됨");
  } catch (error) {
    console.error("renewAccessToken : 접근 토큰 갱신 실패");
    console.error(error);
  }
}
