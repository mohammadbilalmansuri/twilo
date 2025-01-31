import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { authService } from "../appwrite";

const SendPasswordResetLink = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(null);

  const sendLink = async (data) => {
    setIsLoading(true);
    setServerError("");
    setSuccess(null);
    try {
      await authService.sendPasswordResetLink(data.email);
      setSuccess(true);
    } catch (err) {
      setServerError(err?.message || "Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [errors?.email?.message, serverError]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text-red text-center pt-0.5 pb-1">{errorMessages}</p>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>Send Password Reset Link - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
        <h2 className="text-4xl font-bold leading-tight">
          Send Password Reset Link
        </h2>

        <form
          id="password-reset-form"
          onSubmit={handleSubmit(sendLink)}
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

          {renderErrors()}

          <Button type="submit" style={1} size="lg" disabled={isLoading}>
            {isLoading ? <Loader size="sm" color="white" /> : "Send"}
          </Button>

          {success && (
            <p className="text-lg text-blue text-center pt-4">
              Password reset link sent successfully!
            </p>
          )}
        </form>

        <Link
          to="/login"
          className="text-black/60 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
        >
          Go back to login
        </Link>
      </div>
    </>
  );
};

export default SendPasswordResetLink;
