import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { login } from "../store/authSlice";
import { Button, Input, Loader } from "../components";
import { authService } from "../appwrite";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authService.loginUser(data);
      dispatch(login(userData));
      userData.emailVerification
        ? navigate("/posts", { replace: true })
        : navigate("/varify", { replace: true });
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [
      formErrors?.email?.message,
      formErrors?.password?.message,
      error,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text-red text-center pt-0.5 pb-1">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>Login - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-4">
        <h2 className="text-4xl font-bold leading-tight">
          Login to your account
        </h2>

        <p className="text-lg text-black/60">
          Don't have any accounts?{" "}
          <Link to="/login" className="text-blue hover:underline">
            Sign Up
          </Link>
        </p>

        <form
          id="loginForm"
          onSubmit={handleSubmit(loginSubmit)}
          className="w-full max-w-sm relative flex flex-col gap-4 pt-1"
        >
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              maxLength: {
                value: 128,
                message: "Email must be less than 128 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
          />

          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {renderErrors()}

          <Button type="submit" style={1} size="lg" disabled={loading}>
            {loading ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>

        <Link
          to="/send-password-reset-link"
          className="text-lg text-black/60 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
        >
          Forget your password?
        </Link>
      </div>
    </>
  );
};

export default Login;
