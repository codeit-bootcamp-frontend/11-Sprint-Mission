import { AuthResponse } from "@/api/auth.api";
import { setInstanceHeaders } from "@/api/axios";

export default function setLogIn(userData: AuthResponse) {
  const { user, accessToken, refreshToken } = userData;
  sessionStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("birth", new Date().toISOString());
  setInstanceHeaders(accessToken);
}
