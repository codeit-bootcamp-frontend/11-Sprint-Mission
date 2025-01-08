import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterAccessToken";
import userInfoReducer from "./userSlice";
import productInfoReducer from "./productSlice";
import { UserInfoState } from "./userSlice";
import { ProductInfoState } from "./productSlice";
import commentReducer from "./commentSlice";
import { Comment, CommentState } from "./commentSlice";

// localStorage에서 상태 불러오기
const loadState = () => {
  try {
    const confirmedState = localStorage.getItem("reduxState");
    if (confirmedState === null) {
      return undefined; // 초기 localStorage에 상태가 없으면 undefined 반환
    }
    const parsedState = JSON.parse(confirmedState);
    // 상태 구조 확인 및 기본값 추가
    return {
      counter: parsedState.counter || { value: false },
    };
  } catch (e) {
    console.error("Could not load state:", e);
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    // 상태 업데이트하는 리듀서 정의
    counter: counterReducer,
    userInfo: userInfoReducer,
    productInfo: productInfoReducer,
    commentList: commentReducer,
  } as any,
  preloadedState: loadState(), // 초기 상태 설정
  // 앱이 다시 시작될 때도 이전 상태를 유지해야하는 경우 사용하는 옵션
});

export type RootState = {
  render: any;
  userInfo: UserInfoState;
  productInfo: ProductInfoState;
  commentList: CommentState;
};
export type AppDispatch = typeof store.dispatch;

// Redux 상태가 변경될 때 localStorage에 저장
store.subscribe(() => {
  try {
    const confirmedState = JSON.stringify(store.getState());
    localStorage.setItem("reduxState", confirmedState);
  } catch (e) {
    console.error("Could not save state:", e);
  }
});

export default store;
