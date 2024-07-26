import { createSlice } from "@reduxjs/toolkit";

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    draftId: null,
  },
  reducers: {
    setDraftId: (state, action) => {
      state.draftId = action.payload;
    },
  },
});

export const { setDraftId } = draftSlice.actions;
export default draftSlice.reducer;
