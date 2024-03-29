import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
  },
  reducers: {
    setGetProfile: (state, action) => {
      state.email = action.payload.data.body.email;
      state.firstName = action.payload.data.body.firstName;
      state.lastName = action.payload.data.body.lastName;
      state.userName = action.payload.data.body.userName;
    },
    setEditProfile: (state, action) => {
      state.firstName = action.payload;
    },
  },
});

export const { setGetProfile, setEditProfile } = profileSlice.actions;
export default profileSlice.reducer;
