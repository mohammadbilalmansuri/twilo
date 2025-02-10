import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../appwrite/auth";
import { removeUser } from "../store/authSlice";
import { cleanPosts } from "../store/feedSlice";
import { cleanProfiles } from "../store/profilesSlice";
import { useNotification } from ".";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      dispatch(removeUser());
      dispatch(cleanPosts());
      dispatch(cleanProfiles());
      notify({
        type: "success",
        message: "Logged out successfully!",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return {
    logout,
    loggingOut,
  };
};

export default useLogout;
