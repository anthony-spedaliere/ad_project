import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: null,
    username: null,
  },
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
  },
});

export const { setUserId, setUserEmail, setUserUsername } = userSlice.actions;
export default userSlice.reducer;
