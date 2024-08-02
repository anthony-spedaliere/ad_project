import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    draftId: null,
    currDraftInEditing: null,
  },
  reducers: {
    setDraftId: (state, action) => {
      state.draftId = action.payload;
    },
    setCurrDraftInEditing: (state, action) => {
      state.currDraftInEditing = action.payload;
    },
  },
});

export const { setDraftId, setCurrDraftInEditing } = draftSlice.actions;
export default draftSlice.reducer;
