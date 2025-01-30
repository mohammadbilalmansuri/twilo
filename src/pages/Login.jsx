import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { login } from "../store/authSlice";
import { Container, Button, Input, Loader } from "../components";
import { authService } from "../appwrite";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const loginSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const userData = await authService.loginUser(data);
      dispatch(login(userData));
      if (userData.emailVerification) {
        navigate("/posts");
      } else {
        navigate("/verify");
      }
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [
      errors?.email?.message,
      errors?.password?.message,
      serverError,
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

      <Container className="min-h py-8 flex flex-col items-center justify-center gap-4">
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
          className="w-full max-w-sm relative flex flex-col gap-4 pt-2"
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

          <Button type="submit" style={1} size="lg" disabled={isLoading}>
            {isLoading ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>

        <Link
          to="/send-password-reset-link"
          className="text-black/60 pt-2 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
        >
          Forget your password?
        </Link>
      </Container>
    </>
  );
};

export default Login;
