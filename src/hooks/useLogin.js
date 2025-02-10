import { useState } from "react";
import { loginUser } from "../appwrite/auth";
import { setUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from ".";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [loggingIn, setLoggingIn] = useState(false);

  const login = async ({ email, password }) => {
    setLoggingIn(true);
    try {
      const user = await loginUser({ email, password });
      dispatch(setUser(user));
      notify({
        type: "success",
        message: "Logged in successfully!",
      });
      user.emailVerification
        ? navigate("/feed", { replace: true })
        : navigate("/verify", { replace: true });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return {
    login,
    loggingIn,
  };
};

export default useLogin;
