import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserUsername: (state, action) => {
      state.username = action.payload;
    },
    resetUserState: () => initialState, // reset user state to initial values
  },
});

export const { setUserId, setUserEmail, setUserUsername, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;
