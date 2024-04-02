import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Auth/authenticationSlice";
import userInfosReducer from "./UserInfos/userInfosSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    userInfos: userInfosReducer,
  },
});

export default store;
