import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "drafts",
  initialState: {
    completedDrafts: [],
  },
  reducers: {
    setCompletedDrafts: (state, action) => {
      state.completedDrafts = action.payload;
    },
  },
});

export const { setCompletedDrafts } = draftSlice.actions;
export default draftSlice.reducer;
