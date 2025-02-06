import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
  selectUserData,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { authService, databaseService } from "../appwrite";
import { login, logout, verify } from "../store/authSlice";
import { cleanPosts } from "../store/postsSlice";
import { useNotification } from ".";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Check Session

  const checkSession = async () => {
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
  };

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
      const userData = await authService.createAccount({
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
      dispatch(login(userData));
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

  // Login

  const loginUser = async ({ email, password }, setLoggingIn) => {
    setLoggingIn(true);
    try {
      const user = await authService.loginUser({ email, password });
      dispatch(login(user));
      notify({
        type: "success",
        message: "Logged in successfully!",
      });
      user.emailVerification
        ? navigate("/posts", { replace: true })
        : navigate("/verify", { replace: true });
    } catch (err) {
      notify({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoggingIn(false);
    }
  };

  // Logout

  const logoutUser = async (setLoggingOut) => {
    setLoggingOut(true);
    try {
      await authService.logoutUser();
      dispatch(logout());
      dispatch(cleanPosts());
      notify({
        type: "success",
        message: "Logged out successfully!",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setLoggingOut(false);
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
      dispatch(verify());
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
    userData,
    checkSession,
    checkAuth,
    signupUser,
    loginUser,
    logoutUser,
    sendPasswordResetLink,
    resetPassword,
    resendVerificationEmail,
    verifyEmail,
  };
};

export default useAuth;
