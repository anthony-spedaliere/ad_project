import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveDraftData: null, // Object with the draft data - groups, teams, maps, poi's, etc.
  admin: null, // tracks the adminstrator of the draft
  participant: null, // track the participant /  team_owner
  activeUser: null,
  teamsHaveJoined: [], // used to populate the Updates section of draft page right sidebar
  selectedFavorites: [], // used to populate the Queue section of draft page right sidebar
  teamTurnList: [], // holds the uuid for the teams in draft, in order of turn
  currentTurn: 0, // integer representing current turn draft is on. 0 is for predraft countdown and -1 is for end of draft countdown. All positive integers represent the turn based on number of maps * number of teams.
  pickStartTime: null,
  teamNameList: [],
  teamIdList: [],
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
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
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
    setTeamTurnList: (state, action) => {
      state.teamTurnList = action.payload;
    },
    setTeamIdList: (state, action) => {
      state.teamIdList = action.payload;
    },
    setTeamNameList: (state, action) => {
      state.teamNameList = action.payload;
    },
    setCurrentTurn: (state, action) => {
      state.currentTurn = action.payload;
    },
    resetLiveDraftState: () => initialState,
    resetTeamsHaveJoined: (state) => {
      state.teamsHaveJoined = [];
    },
    resetSelectedFavorites: (state) => {
      state.selectedFavorites = [];
    },
    setPickStartTime: (state, action) => {
      state.pickStartTime = action.payload;
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
  setTeamTurnList,
  setTeamNameList,
  setCurrentTurn,
  setActiveUser,
  setTeamIdList,
  setPickStartTime,
} = liveDraftSlice.actions;
export default liveDraftSlice.reducer;
