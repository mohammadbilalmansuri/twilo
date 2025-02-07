import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUser,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { authService, databaseService } from "../appwrite";
import { setUser, verifyUser } from "../store/authSlice";
import { useNotification } from ".";

const useAuthState = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Check Route Authentication

  const checkAuth = async (authentication, pathname) => {
    if (authentication) {
      if (!isLoggedIn) {
        navigate("/login", { replace: true });
        return;
      }

      if (!isVerified) {
        if (!["/verify", "/verification"].includes(pathname)) {
          navigate("/verify", { replace: true });
          return;
        }
      } else {
        if (["/verify", "/verification"].includes(pathname)) {
          navigate("/posts", { replace: true });
          return;
        }
      }
    } else {
      if (isLoggedIn && ["/", "/login", "/register"].includes(pathname)) {
        navigate("/posts", { replace: true });
        return;
      }
    }
  };

  // Sign Up

  const signupUser = async (
    { name, userId, email, password },
    setSigningUp
  ) => {
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

  // Send Password Reset Link

  const sendPasswordResetLink = async (email, setSending) => {
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

  // Reset Password

  const resetPassword = async (userId, secret, password, setResetting) => {
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

  // Resend Verification Email

  const resendVerificationEmail = async (setState) => {
    setState({
      resending: true,
      message: "Resending verification email...",
      error: false,
    });

    try {
      await authService.sendVerificationEmail();
      setState({
        resending: false,
        message: "Verification email has been resent successfully!",
        error: false,
      });
    } catch (err) {
      setState({
        resending: false,
        message: err.message,
        error: true,
      });
    }
  };

  // Verify Email

  const verifyEmail = async (userId, secret, setState) => {
    try {
      if (!userId || !secret) throw new Error("Invalid verification link");
      await authService.Verification(userId, secret);
      setState({
        verifying: false,
        error: false,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      dispatch(verifyUser());
      navigate("/posts", { replace: true });
    } catch (err) {
      setState({
        verifying: false,
        error: err.message,
      });
    }
  };

  return {
    isLoggedIn,
    isVerified,
    user,
    checkSession,
    checkAuth,
    signupUser,
    sendPasswordResetLink,
    resetPassword,
    resendVerificationEmail,
    verifyEmail,
  };
};

export default useAuth;
