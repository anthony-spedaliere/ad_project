import { createSlice } from "@reduxjs/toolkit";

const liveDraftSlice = createSlice({
  name: "liveDraft",
  initialState: {
    liveDraft: null,
    admin: null,
    participant: null,
  },
  reducers: {
    setLiveDraft: (state, action) => {
      state.liveDraft = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
  },
});

export const { setLiveDraft, setAdmin, setParticipant } =
  liveDraftSlice.actions;
export default liveDraftSlice.reducer;
