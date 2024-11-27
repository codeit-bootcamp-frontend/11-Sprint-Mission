import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export default axiosInstance;
