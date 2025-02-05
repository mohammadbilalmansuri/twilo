import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotification: (state, { payload }) => {
      state.isOpen = true;
      state.content = payload;
    },
    closeNotification: (state) => {
      state.isOpen = false;
      state.content = "";
    },
  },
});

export const { openNotification, closeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
