import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: false,
  },
  reducers: {
    check: (state) => {
      state.value = true;
      console.log("check 이후:", state.value);
    },
    reset: (state) => {
      state.value = false;
      console.log("reset 이후:", state.value);
    },
  },
});

const counterReducer = counterSlice.reducer;

export const { check, reset } = counterSlice.actions;
export default counterReducer;
