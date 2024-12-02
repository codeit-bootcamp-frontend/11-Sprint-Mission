import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setInstanceHeaders = (token: string) => {
  instance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });
};
export default instance;
