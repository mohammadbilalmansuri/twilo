import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { useAuth } from "../hooks";

const Login = () => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loggingIn, setLoggingIn] = useState(false);
  const handleLogin = handleSubmit(
    async (data) => await loginUser(data, setLoggingIn)
  );

  const renderErrors = () => {
    const errorMessages = [errors?.email?.message, errors?.password?.message]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="leading-tight text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>Login - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold leading-none">
          Login to your account
        </h1>

        <p className="text-lg leading-none text-black/60">
          Already have an account?{" "}
          <Link to="/login" className="text-blue hover:underline">
            Login
          </Link>
        </p>

        <form
          id="loginForm"
          onSubmit={handleLogin}
          className="w-full max-w-sm relative flex flex-col gap-4"
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

          <Button type="submit" style={1} size="lg" disabled={loggingIn}>
            {loggingIn ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>

        <Link
          to="/send-password-reset-link"
          className="text-lg leading-tight text-black/60 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
        >
          Forget your password?
        </Link>
      </div>
    </>
  );
};

export default Login;
