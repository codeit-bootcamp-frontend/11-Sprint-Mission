import { useRouter } from "next/router";

export default function Logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const router = useRouter();
  router.push("/login");
}
