import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "../store/selectors";
import { open, close } from "../store/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        dispatch(close());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const notify = ({ type = "success", message = "" }) => {
    if (notification.isOpen) dispatch(close());
    dispatch(open({ type, message }));
  };

  const closeNotification = () => {
    if (notification.isOpen) dispatch(close());
  };

  return { notification, notify, closeNotification };
};

export default useNotification;
