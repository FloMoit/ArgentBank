import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "authentication",
  initialState: {
    isConnected: !!sessionStorage.getItem("ArgentBank"),
    isError: false,
    isLoading: false,
  },
  reducers: {
    setAuthStatut: (draft, action) => {
      draft.isConnected = action.payload;
    },
    setLoadingStatut: (draft, action) => {
      draft.isLoading = action.payload;
    },
    setErrorStatut: (draft, action) => {
      draft.isError = action.payload;
    },
  },
});

export const { setAuthStatut, setLoadingStatut, setErrorStatut } = actions;

export default reducer;
