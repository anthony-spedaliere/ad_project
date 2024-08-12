import { createSlice } from "@reduxjs/toolkit";

const draftResultsSlice = createSlice({
  name: "draftResults",
  initialState: {
    draftResultsId: null,
    pois: null,
    teams: null,
  },
  reducers: {
    setDraftResultsId: (state, action) => {
      state.draftResultsId = action.payload;
    },
    setPois: (state, action) => {
      state.pois = action.payload;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
  },
});

export const { setDraftResultsId, setPois, setTeams } =
  draftResultsSlice.actions;
export default draftResultsSlice.reducer;
