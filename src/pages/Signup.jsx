import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { useAuth } from "../hooks";

const Signup = () => {
  const { signupUser } = useAuth();
  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderErrors = () => {
    const errorMessages = [
      errors?.name?.message,
      errors?.userId?.message,
      errors?.email?.message,
      errors?.password?.message,
      state.error,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="leading-tight text-red text-center">{errorMessages}</p>
    ) : null;
  };

  const handleSignup = handleSubmit(async (data) => {
    await signupUser(data, setState);
  });

  return (
    <>
      <Helmet>
        <title>Sign up - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold leading-none">
          Create a new account
        </h1>

        <p className="text-lg leading-none text-black/60 -mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue hover:underline">
            Login
          </Link>
        </p>

        <form
          id="signupForm"
          onSubmit={handleSignup}
          className="w-full max-w-sm relative flex flex-col gap-4"
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

          <Button type="submit" style={1} size="lg" disabled={state.loading}>
            {state.loading ? <Loader size="sm" color="white" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
