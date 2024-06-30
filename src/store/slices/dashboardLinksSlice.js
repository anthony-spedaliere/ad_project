import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLink: "link1",
};

const selectedLinkSlice = createSlice({
  name: "selectedLink",
  initialState,
  reducers: {
    setSelectedLink: (state, action) => {
      state.selectedLink = action.payload;
    },
  },
});

export const { setSelectedLink } = selectedLinkSlice.actions;
export default selectedLinkSlice.reducer;
