import { configureStore } from "@reduxjs/toolkit";

import selectedLinkReducer from "./slices/dashboardLinksSlice";

const store = configureStore({
  reducer: {
    selectedLink: selectedLinkReducer,
  },
});

export default store;
