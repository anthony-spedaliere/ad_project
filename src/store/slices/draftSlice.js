import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    draftId: null,
    currDraft: null,
  },
  reducers: {
    setDraftId: (state, action) => {
      state.draftId = action.payload;
    },
    setCurrDraft: (state, action) => {
      state.currDraft = action.payload;
    },
  },
});

export const { setDraftId, setCurrDraft } = draftSlice.actions;
export default draftSlice.reducer;
