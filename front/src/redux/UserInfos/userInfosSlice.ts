import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "userInfos",
  initialState: {
    data: {
      firstName: "",
      lastName: "",
    },
    isError: false,
    isLoading: false,
  },
  reducers: {
    setData: (draft, action) => {
      draft.data = action.payload;
    },
    setErrorStatut: (draft, action) => {
      draft.isError = action.payload;
    },
    setLoadingStatut: (draft, action) => {
      draft.isLoading = action.payload;
    },
    editUserName: (draft, action) => {
      draft.data.firstName = action.payload.firstName;
      draft.data.lastName = action.payload.lastName;
    },
  },
});

export const { setData, setErrorStatut, setLoadingStatut, editUserName } =
  actions;

export default reducer;
