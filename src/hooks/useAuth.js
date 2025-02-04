import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUserData,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite";
import { logout } from "../store/authSlice";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check Session

  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  const checkSession = useCallback(async () => {
    if (!isLoggedIn) {
      setCheckingSession(false);
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      dispatch(login(user));
    } catch (error) {
      if (error.message === "User (role: guests) missing scope (account)") {
        setSessionError("Session expired, logging out...");
        dispatch(logout());
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/login", { replace: true });
      } else {
        setSessionError(error.message);
      }
    } finally {
      setCheckingSession(false);
    }
  }, [isLoggedIn, dispatch, navigate]);

  // Logout

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

  return {
    isLoggedIn,
    userData,
    isVerified,
    checkSession,
    checkingSession,
    sessionError,
    loggingOut,
    logoutUser,
  };
};

export default useAuth;
