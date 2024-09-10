import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveDraftData: null, // Object with the draft data - groups, teams, maps, poi's, etc.
  admin: null, // tracks the adminstrator of the draft
  participant: null, // track the participant /  team_owner
  teamsHaveJoined: [], // used to populate the Updates section of draft page right sidebar
  selectedFavorites: [], // used to populate the Queue section of draft page right sidebar
  draftStatus: "", // used to handle the draft status bar of draft page left sidebar - "Draft Starting Soon!", "Drafting Now!", "Draft Ended!"
};

const liveDraftSlice = createSlice({
  name: "liveDraft",
  initialState,
  reducers: {
    setLiveDraftData: (state, action) => {
      state.liveDraftData = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
    setDraftStatus: (state, action) => {
      state.draftStatus = action.payload;
    },
    setTeamsHaveJoined: (state, action) => {
      if (Array.isArray(state.teamsHaveJoined)) {
        state.teamsHaveJoined = [...state.teamsHaveJoined, action.payload];
      } else {
        state.teamsHaveJoined = [action.payload];
      }
    },
    setSelectedFavorites: (state, action) => {
      state.selectedFavorites = action.payload;
    },
    resetLiveDraftState: () => initialState,
    resetTeamsHaveJoined: (state) => {
      state.teamsHaveJoined = [];
    },
    resetSelectedFavorites: (state) => {
      state.selectedFavorites = [];
    },
  },
});

export const {
  setLiveDraftData,
  setAdmin,
  setParticipant,
  setTeamsHaveJoined,
  resetLiveDraftState,
  resetTeamsHaveJoined,
  setSelectedFavorites,
  resetSelectedFavorites,
  setDraftStatus,
} = liveDraftSlice.actions;
export default liveDraftSlice.reducer;
