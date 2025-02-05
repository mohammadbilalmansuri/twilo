import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "../store/selectors";
import {
  openNotification,
  closeNotification,
} from "../store/notificationSlice";

const useNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        dispatch(closeNotification());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  const open = (content) => {
    if (notification.isOpen) dispatch(closeNotification());
    dispatch(openNotification(content));
  };

  const close = () => {
    if (notification.isOpen) dispatch(closeNotification());
  };

  return { notification, open, close };
};

export default useNotification;
