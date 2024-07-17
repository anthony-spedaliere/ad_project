// slices/draftSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  groups: [],
  maps: [],
  numMap: 0,
  draftName: "",
  draftType: "Standard",
  draftTimePerPick: 30, // stored in seconds
  draftDate: null,
  draftTime: null,
  shouldSendEmail: false,
  shouldAddGroups: false,
  numGroups: 0,
  numTeams: 0,
  teams: [],
};

const newDraftSlice = createSlice({
  name: "newDraft",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setGroups(state, action) {
      state.groups = action.payload;
    },
    setNumberOfMaps(state, action) {
      const numberOfMaps = action.payload;
      state.numMap = numberOfMaps;
      state.maps = Array.from({ length: numberOfMaps }, () => ({
        mapName: "",
        numPoi: 0,
        pois: [],
      }));
    },
    updateMap(state, action) {
      const { index, key, value } = action.payload;
      if (key === "numPoi") {
        state.maps[index].numPoi = value;
        state.maps[index].pois = Array.from({ length: value }, () => ({
          name: "",
          points: 0,
        }));
      } else {
        state.maps[index][key] = value;
      }
    },
    updatePOI(state, action) {
      const { mapIndex, poiIndex, key, value } = action.payload;
      state.maps[mapIndex].pois[poiIndex][key] = value;
    },
    setDraftName(state, action) {
      state.draftName = action.payload;
    },
    setDraftType(state, action) {
      state.draftType = action.payload;
    },
    setDraftTimePerPick(state, action) {
      state.draftTimePerPick = action.payload;
    },
    setDraftDate(state, action) {
      state.draftDate = action.payload;
    },
    setDraftTime(state, action) {
      state.draftTime = action.payload;
    },
    setShouldSendEmail: (state, action) => {
      state.shouldSendEmail = action.payload;
    },
    setShouldAddGroups(state, action) {
      // New action
      state.shouldAddGroups = action.payload;
    },
    setNumGroups(state, action) {
      // Add action to set numGroups
      state.numGroups = action.payload;
    },
    setNumTeams(state, action) {
      state.numTeams = action.payload;
    },
    setTeams(state, action) {
      state.teams = action.payload;
    },
    updateTeam(state, action) {
      const { index, key, value } = action.payload;
      if (state.teams[index]) {
        state.teams[index][key] = value;
      }
    },
  },
});

export const {
  setCurrentPage,
  setGroups,
  setNumberOfMaps,
  updateMap,
  updatePOI,
  setDraftName,
  setDraftType,
  setDraftTimePerPick,
  setDraftDate,
  setDraftTime,
  setShouldSendEmail,
  setShouldAddGroups,
  setNumGroups,
  setNumTeams,
  setTeams,
  updateTeam,
} = newDraftSlice.actions;

export default newDraftSlice.reducer;
