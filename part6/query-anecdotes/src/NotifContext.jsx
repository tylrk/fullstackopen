import { createContext, useReducer, useContext } from "react";

const notifReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIF":
      return action.payload;
    case "HIDE_NOTIF":
      return "";
    default:
      return state;
  }
};

export const NotifContext = createContext();

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, "");

  return (
    <NotifContext.Provider value={{notif, notifDispatch}}>
      {props.children}
    </NotifContext.Provider>
  );
};

export const showNotif = (dispatch, message) => {
  dispatch({ type: "SHOW_NOTIF", payload: message });
};

export const hideNotif = (dispatch) => {
  dispatch({ type: "HIDE_NOTIF" });
};

export default NotifContext;
