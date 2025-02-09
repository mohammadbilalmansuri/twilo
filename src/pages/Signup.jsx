import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, PasswordInput, Loader } from "../components";
import { useSignup } from "../hooks";

const Signup = () => {
  const { signup, signingUp } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const renderFormErrors = () => {
    const errorMessages = [
      errors?.name?.message,
      errors?.userId?.message,
      errors?.email?.message,
      errors?.password?.message,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>Sign up - Twilo</title>
        <meta name="description" content="Create a new account on Twilo." />
      </Helmet>

      <div className="max-w min-h-inherit relative flex flex-col items-center justify-center sm:gap-4 gap-3 py-8 text-center">
        <h1 className="h1">Create a new account</h1>
        <p className="text text-black/60 -mt-1">
          Already have an account?{" "}
          <Link to="/login" className="text-blue hover:underline">
            Login
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(signup)}
          className="w-full max-w-sm relative flex flex-col sm:gap-4 gap-3 pt-1"
        >
          <Input
            type="text"
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

          <Button type="submit" disabled={signingUp}>
            {signingUp ? <Loader size="sm" color="white" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
