import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetLink, resetPassword } from "../appwrite/auth";
import { useNotification } from ".";

const usePasswordReset = () => {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);

  const sendLink = async ({ email }) => {
    setSending(true);
    try {
      await sendPasswordResetLink(email);
      notify({
        type: "success",
        message:
          "Password reset link sent successfully! Please check your email.",
      });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setSending(false);
    }
  };

  const reset = async ({ userId, secret, password, confirmPassword }) => {
    if (password !== confirmPassword) return;
    setResetting(true);
    try {
      await resetPassword(userId, secret, password);
      notify({
        type: "success",
        message: "Password reset successfully!",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setResetting(false);
    }
  };

  return {
    sendLink,
    sending,
    reset,
    resetting,
  };
};

export default usePasswordReset;
