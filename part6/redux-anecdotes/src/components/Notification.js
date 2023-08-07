// import { createNotification } from "../reducers/notificationReducer";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ filter, anecdotes, notification }) => {
    return notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
