import axios from "axios";

const instance = axios.create({
  // 환경변수 추가 & env.local에 지정
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export default instance;
