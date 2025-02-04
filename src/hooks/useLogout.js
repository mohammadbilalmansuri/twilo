import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite";
import { logout } from "../store/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const logoutUser = useCallback(async () => {
    setLoggingOut(true);
    try {
      await authService.logoutUser();
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Unable to logout user:", error);
      alert(
        "Logout failed. Please refresh the page and try again. If the issue persists, please clear your browser's site data."
      );
    } finally {
      setLoggingOut(false);
    }
  }, [dispatch, navigate]);

  return { logoutUser, loggingOut };
};

export default useLogout;
