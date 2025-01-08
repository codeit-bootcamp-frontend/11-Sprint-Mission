import { createSlice } from "@reduxjs/toolkit";

export interface UserInfoState {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    image: null;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  };
}

const initialState: UserInfoState = {
  accessToken: "",
  refreshToken: "",
  user: {
    id: 0,
    email: "",
    image: null,
    nickname: "",
    updatedAt: "",
    createdAt: "",
  },
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      Object.assign(state, { accessToken, refreshToken, user });
    },
    resetUserInfo: (state) => {
      Object.assign(state, initialState);
    },
  },
});

const userInfoReducer = userInfoSlice.reducer;

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;
export default userInfoReducer;
