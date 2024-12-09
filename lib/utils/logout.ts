import { useRouter } from "next/router";

export function Logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const router = useRouter();
  router.push("/login");
}
