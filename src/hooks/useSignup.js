import { useState } from "react";
import { authService } from "../appwrite";
import { setUser } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from ".";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [signingUp, setSigningUp] = useState(false);

  const signup = async ({ name, userId, email, password }) => {
    setSigningUp(true);
    try {
      const user = await authService.createAccount({
        name,
        userId,
        email,
        password,
      });
      await databaseService.createProfile({
        userId,
        name,
        email,
      });
      dispatch(setUser(user));
      notify({
        type: "success",
        message: "Account created successfully!",
      });
      navigate("/verify", { replace: true });
    } catch (err) {
      notify({
        type: "error",
        message:
          err.message ===
          "A user with the same id, email, or phone already exists in this project."
            ? "An account with the same email or username already exists."
            : err?.message,
      });
    } finally {
      setSigningUp(false);
    }
  };

  return {
    signup,
    signingUp,
  };
};

export default useSignup;
