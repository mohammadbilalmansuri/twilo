import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button, Input, Loader } from "../components";
import { useAuth } from "../hooks";

const SendPasswordResetLink = () => {
  const { userData, sendPasswordResetLink } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userData?.email || "",
    },
  });

  const [sending, setSending] = useState(false);

  const handleSendPasswordResetLink = handleSubmit(async (data) => {
    await sendPasswordResetLink(data.email, setSending);
  });

  return (
    <>
      <Helmet>
        <title>Send Password Reset Link - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold leading-none">
          Send Password Reset Link
        </h1>

        <form
          id="sendPasswordResetLinkForm"
          onSubmit={handleSendPasswordResetLink}
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

          {errors?.email?.message && (
            <p className="leading-tight text-red text-center">
              {errors.email.message}
            </p>
          )}

          <Button type="submit" style={1} disabled={sending}>
            {sending ? <Loader size="sm" color="white" /> : "Send"}
          </Button>
        </form>

        {!userData?.email && (
          <Link
            to="/login"
            className="text-lg leading-tight text-black/60 border-b border-black/20 transition-all hover:border-blue hover:text-blue"
          >
            Go back to login
          </Link>
        )}
      </div>
    </>
  );
};

export default SendPasswordResetLink;
