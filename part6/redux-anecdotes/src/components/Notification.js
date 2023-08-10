import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    return notifications;
  });

  const dispatch = useDispatch();

  const style = {
    display: "none",
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  if (notification) {
    style.display = "block";
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
