import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';

interface GetCommentResultResponse {
  list: Comment[];
  nextCursor: string;
}

interface CreateCommentResultResponse {}

// -- Comment API
export const getComment = async (
  productId: number,
  params: {},
): Promise<AxiosResponse<GetCommentResultResponse>> => {
  try {
    return await axiosInstance.get(`/products/${productId}/comments`, {
      params: {
        productId: productId,
        limit: 10,
        cursor: null,
        ...params,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error('데이터를 불러오는도중 에러가 발생했습니다.');
    } else {
      console.error('Unknown Error:', error);
      throw new Error('기타 에러입니다.');
    }
  }
};

export const createComments = async (
  productId: number,
  content: { content: string },
) => {
  try {
    return await axiosInstance.post(
      `/products/${productId}/comments`,
      content,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error('데이터를 불러오는도중 에러가 발생했습니다.');
    } else {
      console.error('Unknown Error:', error);
      throw new Error('기타 에러입니다.');
    }
  }
};
