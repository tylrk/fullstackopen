import { createSlice } from "@reduxjs/toolkit";

const initialState = "somethin";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
  },
});

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
