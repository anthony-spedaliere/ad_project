import { createSlice } from "@reduxjs/toolkit";

const inviteTeamLinkSlice = createSlice({
  name: "inviteTeamLinks",
  initialState: {
    draftIdTeamInviteLink: null,
    invitedTeams: [],
  },
  reducers: {
    setdraftIdTeamInviteLink: (state, action) => {
      state.draftIdTeamInviteLink = action.payload;
    },
    setInvitedTeams: (state, action) => {
      state.invitedTeams = action.payload;
    },
  },
});

export const { setInvitedTeams, setdraftIdTeamInviteLink } =
  inviteTeamLinkSlice.actions;
export default inviteTeamLinkSlice.reducer;
