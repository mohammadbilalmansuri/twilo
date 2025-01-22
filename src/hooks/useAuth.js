import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../store/authSlice";
import { cleanPosts } from "../store/postSlice";
import { cleanUsers } from "../store/userSlice";
import authService from "../appwrite/auth";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const getUser = () =>
    isLoggedIn ? useSelector((state) => state.auth.userData) : null;

  const logoutUser = async () => {
    try {
      const status = await authService.logoutUser();
      if (status) {
        dispatch(logout());
        dispatch(cleanPosts());
        dispatch(cleanUsers());
        localStorage.setItem("isLoggedIn", "false");
        navigate("/");
      }
    } catch (error) {
      console.error("Unable to logout user:", error);
    }
  };

  return {
    isLoggedIn,
    getUser,
    logoutUser,
  };
};

export default useAuth;
