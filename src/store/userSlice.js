import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.status = true;
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.$id === action.payload.$id
      );
      if (index !== -1) state.users[index] = action.payload;
    },
    cleanUsers: (state) => {
      state.status = false;
      state.users = [];
    },
  },
});

export const { setUsers, updateUser, cleanUsers } = userSlice.actions;

export default userSlice.reducer;
