import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { authService } from "../appwrite";
import { useAuth } from "../hooks";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!userId || !secret) {
      setIsValid(false);
      console.error("Invalid password reset link!");
    } else {
      setIsValid(true);
    }
  }, [userId, secret]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [resetting, setResetting] = useState(false);

  const handleResetPassword = handleSubmit(
    async ({ password, confirmPassword }) => {
      if (password !== confirmPassword) return;
      await resetPassword(userId, secret, password, setResetting);
    }
  );

  const renderErrors = () => {
    const errorMessages = [
      errors?.password?.message,
      errors?.confirmPassword?.message,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="leading-tight text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return (
    isValid !== null && (
      <>
        <Helmet>
          <title>Reset Password - Twilo</title>
        </Helmet>

        <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
          {isValid ? (
            <>
              <h1 className="text-4xl font-bold leading-none">
                Reset Password
              </h1>
              <form
                id="resetPasswordForm"
                onSubmit={handleResetPassword}
                className="w-full max-w-sm relative flex flex-col gap-4"
              >
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter new password"
                  {...register("password", {
                    required: true,
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
                    required: true,
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />

                {renderErrors()}

                <Button type="submit" style={1} disabled={resetting}>
                  {resetting ? <Loader size="sm" color="white" /> : "Reset"}
                </Button>
              </form>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 512 512"
                className="size-16 fill-red"
                aria-label="Error Icon"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
              </svg>
              <h1 className="text-4xl font-bold leading-none">
                Invalid password reset link!
              </h1>
            </>
          )}
        </div>
      </>
    )
  );
};

export default ResetPassword;
