import { setInstanceHeaders } from "@/api/axios";

export default function setLogOut() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("birth");
  setInstanceHeaders();
}
