import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveDraft: null,
  admin: null,
  participant: null,
  teamsHaveJoined: [],
  selectedFavorites: [],
};

const liveDraftSlice = createSlice({
  name: "liveDraft",
  initialState,
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
  },
});

export const {
  setLiveDraft,
  setAdmin,
  setParticipant,
  setTeamsHaveJoined,
  resetLiveDraftState,
  resetTeamsHaveJoined,
  setSelectedFavorites,
} = liveDraftSlice.actions;
export default liveDraftSlice.reducer;
