import { configureStore } from "@reduxjs/toolkit";

// slices
import selectedLinkReducer from "./slices/dashboardLinksSlice";
import draftsReducer from "./slices/draftSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    selectedLink: selectedLinkReducer,
    drafts: draftsReducer,
    user: userReducer,
  },
});

export default store;
