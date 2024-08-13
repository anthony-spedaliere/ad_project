import { createSlice } from "@reduxjs/toolkit";

const draftResultsSlice = createSlice({
  name: "draftResults",
  initialState: {
    draftResultsId: null,
    pois: null,
    teams: null,
    maps: null,
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
    setMaps: (state, action) => {
      state.maps = action.payload;
    },
  },
});

export const { setDraftResultsId, setPois, setTeams, setMaps } =
  draftResultsSlice.actions;
export default draftResultsSlice.reducer;
