// api
interface Headers {
  [key: string]: string;
}

export const BASE_URL: string = 'https://panda-market-api.vercel.app';
export const DEFAULT_HEADERS: Headers = {
  'Content-Type': 'application/json',
};
export const TOTAL_COUNT = 1000;

//pages
export const DEFAULT_ROW: number = 8;
export const DEFAULT_BEST_PRODUCT_COUNT: number = 4;
export const DEFAULT_DELAY_TIME: number = 200;
export const DEFAULT_PROFILE_IMAGE: string = '/images/icons/ic_mypage.svg';
