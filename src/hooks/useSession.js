import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../appwrite/auth";
import { setUser, removeUser } from "../store/authSlice";
import { useNotification, useAuthState } from ".";

const useSession = () => {
  const { isLoggedIn } = useAuthState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [checking, setChecking] = useState(true);

  const checkSession = async () => {
    if (!isLoggedIn) {
      setChecking(false);
      return;
    }

    try {
      const user = await getCurrentUser();
      dispatch(setUser(user));
    } catch (error) {
      console.log(error.code);

      if (
        error.code === 401 ||
        error.message === "User (role: guests) missing scope (account)"
      ) {
        dispatch(removeUser());
        notify({
          type: "error",
          message: "Session expired. Please login again.",
        });
        navigate("/login", { replace: true });
      } else {
        notify({
          type: "error",
          message: error.message,
        });
      }
    } finally {
      setChecking(false);
    }
  };

  return { checkSession, checking };
};

export default useSession;
