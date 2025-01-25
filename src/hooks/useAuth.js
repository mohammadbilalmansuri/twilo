import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { authService } from "../appwrite";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);
  const isVerified = useSelector((state) => state.auth.verified);
  const userData = useSelector((state) => state.auth.userData);

  const logoutUser = useCallback(async () => {
    try {
      await authService.logoutUser();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Unable to logout user:", error);
      alert("Logout failed. Please refresh the page and try again.");
    }
  }, [dispatch, navigate]);

  const getUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      dispatch(login(user));
    } catch (error) {
      console.error("Unable to get user data:", error);
      throw error;
    }
  }, [dispatch]);

  return useMemo(
    () => ({
      isLoggedIn,
      userData,
      isVerified,
      logoutUser,
      getUser,
    }),
    [isLoggedIn, userData, isVerified, logoutUser, getUser]
  );
};

export default useAuth;
