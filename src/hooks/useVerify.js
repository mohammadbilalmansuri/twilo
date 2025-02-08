import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite";
import { verifyUser } from "../store/authSlice";
import { useNotification } from ".";

const useVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [resending, setResending] = useState(false);

  const resendVerificationEmail = async () => {
    setResending(true);
    try {
      await authService.sendVerificationEmail();
      notify({
        type: "success",
        message: "Verification email resent successfully!",
      });
    } catch (err) {
      notify({
        type: "error",
        message: err.message,
      });
    } finally {
      setResending(false);
    }
  };

  const verify = async (userId, secret) => {
    try {
      if (!userId || !secret) throw new Error("Invalid verification link");
      await authService.verification(userId, secret);
      dispatch(verifyUser());
      notify({
        type: "success",
        message: "Email verified successfully!",
      });
      navigate("/feed", { replace: true });
    } catch (err) {
      notify({
        type: "error",
        message: err.message,
      });
      navigate("/verify", { replace: true });
    }
  };

  return {
    verify,
    resendVerificationEmail,
    resending,
  };
};

export default useVerify;
