import { configureStore } from "@reduxjs/toolkit";

// slices
import selectedLinkReducer from "./slices/dashboardLinksSlice";
import draftsReducer from "./slices/draftSlice";
import userIdReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    selectedLink: selectedLinkReducer,
    drafts: draftsReducer,
    user: userIdReducer,
  },
});

export default store;
