import { createSlice } from "@reduxjs/toolkit";

const inviteTeamLinkSlice = createSlice({
  name: "inviteTeamLinks",
  initialState: {
    invitedTeams: [],
  },
  reducers: {
    setInvitedTeams: (state, action) => {
      state.invitedTeams = action.payload;
    },
  },
});

export const { setInvitedTeams } = inviteTeamLinkSlice.actions;
export default inviteTeamLinkSlice.reducer;
