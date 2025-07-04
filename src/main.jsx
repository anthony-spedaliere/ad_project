import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//redux-persist
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

// import redux store
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
