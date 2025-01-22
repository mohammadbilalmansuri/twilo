import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  users: null,
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
      const [userId, userData] = action.payload;
      state.users = state.users.map((user) =>
        user.$id === userId ? userData : user
      );
    },
    cleanUsers: (state) => {
      state.status = false;
      state.users = null;
    },
  },
});

export const { setUsers, updateUser, cleanUsers } = userSlice.actions;

export default userSlice.reducer;
