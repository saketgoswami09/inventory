import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollasped: boolean;
  isDarkMode: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarCollasped: false,
  isDarkMode: false,
};

export const gloabalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollasped = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = gloabalSlice.actions;
export default gloabalSlice.reducer;
