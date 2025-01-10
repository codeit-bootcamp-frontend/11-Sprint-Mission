import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
}

export interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
    },
  },
});
const commentReducer = commentSlice.reducer;
export const { setComment, addComment } = commentSlice.actions;

export default commentReducer;
