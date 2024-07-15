// slices/draftSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  groups: [],
  maps: [],
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
      state.maps = Array.from({ length: numberOfMaps }, () => ({
        mapName: "",
        stormPoints: 0,
        pois: [],
      }));
    },
    updateMap(state, action) {
      const { index, key, value } = action.payload;
      if (key === "stormPoints") {
        state.maps[index].stormPoints = value;
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
  },
});

export const {
  setCurrentPage,
  setGroups,
  setNumberOfMaps,
  updateMap,
  updatePOI,
} = newDraftSlice.actions;

export default newDraftSlice.reducer;
