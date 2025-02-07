import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { useLogin } from "../hooks";

const Login = () => {
  const { loggingIn, login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderErrors = () => {
    const errorMessages = [errors?.email?.message, errors?.password?.message]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text-red text-center leading-normal">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-4">
        <Helmet>
          <title>Login - Twilo</title>
          <meta name="description" content="Login to your Twilo account." />
        </Helmet>

        <h1 className="text-4xl font-bold">Login to your account</h1>

        <p className="text-lg text-black/60">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue hover:underline">
            Sign up
          </Link>
        </p>

        <form
          id="loginForm"
          onSubmit={handleSubmit(login)}
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

          <Button type="submit" style={1} disabled={loggingIn}>
            {loggingIn ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>

        <Link
          to="/send-password-reset-link"
          className="text-lg leading-tight text-black/60 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
        >
          Forgot your password?
        </Link>
      </div>
    </>
  );
};

export default Login;
