import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { login } from "../store/authSlice";
import { Container, Button, Input, Loader } from "../components";
import { authService, databaseService } from "../appwrite";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const signupSubmit = async (data) => {
    setIsLoading(true);
    setServerError("");
    try {
      const { name, userId, email, password } = data;
      const userData = await authService.createAccount({
        name,
        userId,
        email,
        password,
      });
      await databaseService.createUser({
        userId,
        name,
        email,
      });
      dispatch(login(userData));
      navigate("/verify");
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [
      errors?.name?.message,
      errors?.userId?.message,
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
        <title>Sign up - Twilo</title>
      </Helmet>

      <Container className="min-h py-8 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold leading-tight">
          Create a new account
        </h1>

        <p className="text-lg text-black/60">
          Already have an account?{" "}
          <Link to="/login" className="text-blue hover:underline">
            Login
          </Link>
        </p>

        <form
          id="signupForm"
          onSubmit={handleSubmit(signupSubmit)}
          className="w-full max-w-sm relative flex flex-col gap-4 pt-2"
        >
          <Input
            type="text"
            id="name"
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters",
              },
              maxLength: {
                value: 36,
                message: "Full name must be less than 36 characters",
              },
            })}
          />

          <Input
            type="text"
            id="userId"
            placeholder="Enter your username"
            {...register("userId", {
              required: true,
              minLength: {
                value: 5,
                message: "Username must be at least 5 characters",
              },
              maxLength: {
                value: 36,
                message: "Username must be less than 36 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message:
                  "Username can only contain letters, numbers, underscores, and hyphens",
              },
            })}
          />

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
            {isLoading ? <Loader size="sm" color="white" /> : "Sign Up"}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Signup;
