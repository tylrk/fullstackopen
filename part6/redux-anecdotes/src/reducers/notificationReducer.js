import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return initialState;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (notif, timer) => {
  return (dispatch) => {
    const convertedTimer = timer * 1000;
    dispatch(createNotification(notif));
    setTimeout(() => {
      dispatch(removeNotification(convertedTimer));
    }, convertedTimer);
  };
};
export default notificationSlice.reducer;
