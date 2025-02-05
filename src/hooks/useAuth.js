import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUserData,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite";
import { login, logout } from "../store/authSlice";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check Session

  const [session, setSession] = useState({
    loading: true,
    error: null,
  });

  const checkSession = useCallback(async () => {
    if (!isLoggedIn) {
      setSession((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      dispatch(login(user));
    } catch (error) {
      if (error.message === "User (role: guests) missing scope (account)") {
        setSession((prev) => ({
          ...prev,
          error: "Session expired, please login again.",
        }));
        dispatch(logout());
        navigate("/login", { replace: true });
      } else {
        setSession((prev) => ({ ...prev, error: error.message }));
      }
    } finally {
      setSession((prev) => ({ ...prev, loading: false }));
    }
  }, [isLoggedIn, dispatch, navigate]);

  // Check Route Authentication
  const checkAuth = useCallback(
    async (authentication, location) => {
      if (authentication) {
        if (!isLoggedIn) {
          navigate("/login", { replace: true, state: { from: location } });
          return;
        }

        if (isVerified) {
          if (["/verify", "/verify-email"].includes(location.pathname)) {
            navigate("/posts", { replace: true });
          }
        } else if (!["/verify", "/verify-email"].includes(location.pathname)) {
          navigate("/verify", { replace: true });
        }
      } else if (isLoggedIn) {
        if (
          ["/", "/login", "/register", "send-password-reset-link"].includes(
            location.pathname
          )
        ) {
          navigate("/posts", { replace: true });
        }
      }
    },
    [isLoggedIn, isVerified, navigate]
  );

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
    session,
    checkSession,
    checkAuth,
    loggingOut,
    logoutUser,
  };
};

export default useAuth;
