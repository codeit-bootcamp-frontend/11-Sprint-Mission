import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터를 통해 인증 토큰 추가
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem("accessToken");
        // 로그인 페이지로 리디렉션
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
