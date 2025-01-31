import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { authService } from "../appwrite";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!userId || !secret) {
      setIsValid(false);
      console.error("Invalid password reset link");
    } else {
      setIsValid(true);
    }
  }, [userId, secret]);

  const resetPassword = async (data) => {
    setIsLoading(true);
    setServerError("");
    setSuccess(null);
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await authService.resetPassword({
        userId,
        secret,
        password: data.password,
      });
      setSuccess(true);
      setIsLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      setServerError(err?.message || "Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  const renderErrors = () => {
    const errorMessages = [
      errors?.password?.message,
      errors?.confirmPassword?.message,
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
        <title>Reset Password - Twilo</title>
      </Helmet>

      {isValid === false ? (
        <div className="max-w min-h relative py-8 flex flex-col items-center justify-center text-center gap-8">
          <svg
            viewBox="0 0 512 512"
            className="size-16 fill-red"
            role="img"
            aria-label="Error Icon"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <h2 className="text-3xl font-bold leading-tight">
            Invalid password reset link!
          </h2>
        </div>
      ) : (
        <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
          <h2 className="text-4xl font-bold leading-tight">Reset Password</h2>

          <form
            id="resetForm"
            onSubmit={handleSubmit(resetPassword)}
            className="w-full max-w-sm relative flex flex-col gap-4"
          >
            <Input
              type="password"
              id="password"
              placeholder="Enter new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />

            {renderErrors()}

            <Button type="submit" style={1} size="lg" disabled={isLoading}>
              {isLoading ? <Loader size="sm" color="white" /> : "Reset"}
            </Button>

            {success && (
              <div className="pt-2 text-center text-blue">
                <p className="text-lg">Password reset successfully.</p>
                <p>Redirecting to login page...</p>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
