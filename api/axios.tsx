import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let interceptorId: any;

export const setInstanceHeaders = (token?: string) => {
  const value = token ? `Bearer ${token}` : undefined;
  // 기존 인터셉터 제거
  if (interceptorId !== undefined) {
    instance.interceptors.request.eject(interceptorId);
  }

  // 새로운 인터셉터 추가
  interceptorId = instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = value;
    return config;
  });
};
export default instance;
