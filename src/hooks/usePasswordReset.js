import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../appwrite";
import { useNotification } from ".";

const usePasswordReset = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);

  const sendLink = async ({ email }) => {
    setSending(true);
    try {
      await authService.sendPasswordResetLink(email);
      notify({
        type: "success",
        message:
          "Password reset link sent successfully! Please check your email.",
      });
    } catch (err) {
      notify({
        type: "error",
        message: err.message,
      });
    } finally {
      setSending(false);
    }
  };

  const resetPassword = async (userId, secret, password, confirmPassword) => {
    if (password !== confirmPassword) return;
    setResetting(true);
    try {
      await authService.resetPassword({ userId, secret, password });
      notify({
        type: "success",
        message: "Password reset successfully!",
      });
      navigate("/login", { replace: true });
    } catch (err) {
      notify({
        type: "error",
        message: err.message,
      });
    } finally {
      setResetting(false);
    }
  };

  return {
    sendLink,
    sending,
    resetPassword,
    resetting,
  };
};

export default usePasswordReset;
