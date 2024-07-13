// slices/draftSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  groups: [],
};

const newDraftSlice = createSlice({
  name: "newDraft",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setGroups(state, action) {
      state.groups = action.payload;
    },
  },
});

export const { setCurrentPage, setGroups } = newDraftSlice.actions;

export default newDraftSlice.reducer;
