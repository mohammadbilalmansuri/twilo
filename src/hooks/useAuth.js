import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUserData,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { authService, databaseService } from "../appwrite";
import { login, logout } from "../store/authSlice";
import { useNotification } from ".";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Check Session

  const checkSession = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      const user = await authService.getCurrentUser();
      dispatch(login(user));
    } catch (error) {
      if (error.message === "User (role: guests) missing scope (account)") {
        dispatch(logout());
        navigate("/login", { replace: true });
        notify({
          type: "error",
          message: "Session expired. Please login again.",
        });
      } else {
        notify({
          type: "error",
          message: error.message,
        });
      }
    }
  }, [isLoggedIn, dispatch, navigate]);

  // Check Route Authentication

  const checkAuth = useCallback(
    async (authentication, pathname) => {
      if (authentication) {
        if (!isLoggedIn) {
          navigate("/login", { replace: true });
          return;
        }

        if (!isVerified) {
          if (!["/verify", "/verify-email"].includes(pathname)) {
            navigate("/verify", { replace: true });
          }
          return;
        }

        if (["/verify", "/verify-email"].includes(pathname)) {
          navigate("/posts", { replace: true });
        }
        return;
      }

      if (
        isLoggedIn &&
        ["/", "/login", "/register", "/send-password-reset-link"].includes(
          pathname
        )
      ) {
        navigate("/posts", { replace: true });
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
      notify({ type: "success", message: "Logged out successfully." });
    } catch (error) {
      console.error("Unable to logout user:", error);
      notify({
        type: "error",
        message:
          "Logout failed. Please refresh and try again. Clear site data if the issue persists.",
      });
    } finally {
      setLoggingOut(false);
    }
  }, [dispatch, navigate]);

  // Sign Up

  const signupUser = useCallback(
    async ({ name, userId, email, password }, setState) => {
      setState({ loading: true, error: null });
      try {
        const userData = await authService.createAccount({
          name,
          userId,
          email,
          password,
        });
        await databaseService.createUser({
          userId,
          name,
          email,
        });
        dispatch(login(userData));
        navigate("/verify", { replace: true });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error:
            err.message ===
            "A user with the same id, email, or phone already exists in this project."
              ? "An account with the same email or username already exists."
              : err?.message,
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [dispatch, navigate]
  );

  return {
    isLoggedIn,
    userData,
    isVerified,
    checkSession,
    checkAuth,
    loggingOut,
    logoutUser,
    signupUser,
  };
};

export default useAuth;
