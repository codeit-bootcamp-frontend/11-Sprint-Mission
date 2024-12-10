import { postRefresh } from "@/api/auth.api";
import getElapsedTime from "./getElapsedTime";
import { setInstanceHeaders } from "@/api/axios";

const DEFAULT_MAX_AGE = 1800;

export default async function renewAccessToken(
  maxAge: number = DEFAULT_MAX_AGE
) {
  const birth = sessionStorage.getItem("birth");
  if (!birth) return;

  const lapse = getElapsedTime(birth);
  if (lapse < maxAge) return;

  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await postRefresh(refreshToken);
    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("birth", new Date().toISOString());
    setInstanceHeaders(response.accessToken);
  } catch (error) {
    console.error(error);
  }
}
