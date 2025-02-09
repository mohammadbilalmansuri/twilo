import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, PasswordInput, Loader } from "../components";
import { useLogin } from "../hooks";

const Login = () => {
  const { login, loggingIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderFormErrors = () => {
    const errorMessages = [errors?.email?.message, errors?.password?.message]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>Login - Twilo</title>
        <meta name="description" content="Login to your Twilo account." />
      </Helmet>

      <div className="max-w min-h-inherit relative flex flex-col items-center justify-center sm:gap-4 gap-3 py-4 text-center">
        <h1 className="h1">Login to your account</h1>
        <p className="text text-black/60 -mt-0.5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue hover:underline">
            Sign up
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(login)}
          className="w-full max-w-sm relative flex flex-col lg:gap-4 gap-3 pt-1"
        >
          <Input
            type="email"
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

          <PasswordInput
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {renderFormErrors()}

          <Button type="submit" disabled={loggingIn}>
            {loggingIn ? <Loader size="sm" color="white" /> : "Login"}
          </Button>
        </form>

        <Link
          to="/forgot-password"
          className="text text-black/60 border-b-1.5 border-black/10 hover:border-blue hover:text-blue transition-all"
        >
          Forgot your password?
        </Link>
      </div>
    </>
  );
};

export default Login;
