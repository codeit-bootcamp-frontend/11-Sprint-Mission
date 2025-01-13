import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: false,
  },
  reducers: {
    //액션을 설정한다.
    check: (state) => {
      state.value = true;
    },
    reset: (state) => {
      state.value = false;
    },
  },
});

const counterReducer = counterSlice.reducer;

export const { check, reset } = counterSlice.actions;
export default counterReducer;
