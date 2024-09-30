import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveDraftData: null, // Object with the draft data - groups, teams, maps, poi's, etc.
  admin: null, // tracks the adminstrator of the draft
  participant: null, // track the participant /  team_owner
  activeUser: null,
  teamsHaveJoined: [], // used to populate the Updates section of draft page right sidebar
  selectedFavorites: [], // used to populate the Queue section of draft page right sidebar
  teamTurnList: [], // holds the uuid for the teams in draft, in order of turn
  currentTurn: null, // integer representing current turn draft is on. 0 is for predraft countdown. All integers represent the turn based on number of maps * number of teams. Anything greater than that is end of draft timer.
  pickStartTime: null,
  teamNameList: [], // an array of all team names in order of their pick for all rounds
  teamIdList: [], // an array of all the team id's in order of their picks for all rounds
  usersPicks: [], // the picks that show up under My Picks within DraftRightSidebar
  selectedByList: [], // array of objects containing drafted poid - [{poiId: int, selectedBy: string}]
  isHideDraftedChecked: false, // state to handle the hide drafted checkbox in draft header
  selectedMaps: "all-maps", // state to handle the drop down styled select filter in draft header
  searchQuery: "", // The value of the query used in Search Poi's input from dreaft header
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setParticipant: (state, action) => {
      state.participant = action.payload;
    },
    setSelectedMap: (state, action) => {
      state.selectedMaps = action.payload;
    },
    setIsHideDraftedChecked: (state, action) => {
      state.isHideDraftedChecked = action.payload;
    },
    toggleIsHideDraftedChecked: (state) => {
      state.isHideDraftedChecked = !state.isHideDraftedChecked;
    },
    setSelectedByList: (state, action) => {
      const { poiId, teamName } = action.payload;

      // Check if the poiId already exists in the selectedByList
      const existingIndex = state.selectedByList.findIndex(
        (item) => item.poiId === poiId
      );

      if (existingIndex > -1) {
        // If it exists, update the selectedBy for that poiId
        state.selectedByList[existingIndex].selectedBy = teamName;
      } else {
        // If it doesn't exist, add a new entry
        state.selectedByList.push({ poiId, selectedBy: teamName });
      }

      // Remove the POI from the user's selectedFavorites (queue) if it exists
      state.selectedFavorites = state.selectedFavorites.filter(
        (favorite) => favorite.poi_id !== poiId
      );
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
    setUsersPicks: (state, action) => {
      state.usersPicks = action.payload;
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
  setSelectedMap,
  resetTeamsHaveJoined,
  setSelectedFavorites,
  resetSelectedFavorites,
  setTeamTurnList,
  setIsHideDraftedChecked,
  toggleIsHideDraftedChecked,
  setTeamNameList,
  setCurrentTurn,
  setActiveUser,
  setUsersPicks,
  setSearchQuery,
  setSelectedByList,
  setTeamIdList,
  setPickStartTime,
} = liveDraftSlice.actions;
export default liveDraftSlice.reducer;
