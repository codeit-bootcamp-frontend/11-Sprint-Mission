import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  timeout: 2000,
});

export default axiosInstance;
