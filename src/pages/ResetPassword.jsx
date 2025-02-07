import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, PasswordInput, Loader, Loading } from "../components";
import { usePasswordReset, useNotification } from "../hooks";

const ResetPassword = () => {
  const { notify } = useNotification();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const [isValid, setIsValid] = useState(false);
  const { resetPassword, resetting } = usePasswordReset();

  useEffect(() => {
    if (!userId || !secret) {
      notify({
        type: "error",
        message: "Invalid password reset link!",
      });
      navigate("/forgot-password", { replace: true });
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

  const renderErrors = () => {
    const errorMessages = [
      errors?.password?.message,
      errors?.confirmPassword?.message,
    ]
      .filter(Boolean)
      .join(", ");

    return errorMessages.length ? (
      <p className="text text-red text-center">{errorMessages}</p>
    ) : null;
  };

  return isValid ? (
    <>
      <Helmet>
        <title>Reset Password - Twilo</title>
        <meta name="description" content="Reset your Twilo account password" />
      </Helmet>

      <div className="wrapper-center gap-4 py-8 text-center">
        <h1 className="h1">Reset Password</h1>
        <form
          onSubmit={handleSubmit(resetPassword)}
          className="w-full max-w-sm relative flex flex-col gap-4"
        >
          <PasswordInput
            placeholder="Enter new password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <PasswordInput
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />

          {renderErrors()}

          <Button type="submit" disabled={resetting}>
            {resetting ? <Loader size="sm" color="white" /> : "Reset"}
          </Button>
        </form>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ResetPassword;
