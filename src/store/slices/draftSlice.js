import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    draftId: null,
    currDraftInEditing: null,
    draftsLength: null,
  },
  reducers: {
    setDraftId: (state, action) => {
      state.draftId = action.payload;
    },
    setCurrDraftInEditing: (state, action) => {
      state.currDraftInEditing = action.payload;
    },
    setDraftsLength: (state, action) => {
      state.draftsLength = action.payload;
    },
  },
});

export const { setDraftId, setCurrDraftInEditing, setDraftsLength } =
  draftSlice.actions;
export default draftSlice.reducer;
