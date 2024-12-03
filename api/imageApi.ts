import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface UploadImageResponse {
  url: string;
}

export const uploadImage = async (
  file: File,
): Promise<UploadImageResponse | undefined> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response: AxiosResponse = await axiosInstance.post(
      '/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      },
    );
    console.log('파일 업로드 성공:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('파일 업로드 실패:', error.response?.data || error.message);
    } else {
      console.error('알 수 없는 오류 발생:', error);
    }
  }
};
