import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: "success",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    open: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.message = payload.message;
    },
    close: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { open, close } = notificationSlice.actions;
export default notificationSlice.reducer;
