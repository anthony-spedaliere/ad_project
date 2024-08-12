import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// slices
import selectedLinkReducer from "./slices/dashboardLinksSlice";
import userReducer from "./slices/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import newDraftReducer from "./slices/newDraftSlice";
import draftReducer from "./slices/draftSlice";
import draftResultsReducer from "./slices/draftResultsSlice";

const rootReducer = combineReducers({
  selectedLink: selectedLinkReducer,
  user: userReducer,
  newDraft: newDraftReducer,
  draft: draftReducer,
  draftResults: draftResultsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
