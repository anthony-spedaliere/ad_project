import { createSlice } from "@reduxjs/toolkit";

const joinedDraftsSlice = createSlice({
  name: "joinedDrafts",
  initialState: {
    joinedDrafts: [],
  },
  reducers: {
    setJoinedDrafts: (state, action) => {
      state.joinedDrafts = action.payload;
    },
  },
});

export const { setJoinedDrafts } = joinedDraftsSlice.actions;
export default joinedDraftsSlice.reducer;
