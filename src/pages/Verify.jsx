import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Loader } from "../components";
import { authService } from "../appwrite";

const Verify = () => {
  const [status, setStatus] = useState({
    type: "success",
    message: "Verification email sent successfully!",
  });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const resendEmail = async () => {
    setIsLoading(true);
    setFailedAttempts((prev) => prev + 1);
    setStatus({
      type: "info",
      message: "Resending verification email...",
    });
    try {
      await authService.sendVerificationEmail();
      setStatus({
        type: "success",
        message: "Verification email resent successfully!",
      });
    } catch (err) {
      setStatus({ type: "error", message: err?.message });
      console.error("Error during email resend:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify - Twilo</title>
      </Helmet>

      <div className="max-w min-h relative py-8 flex flex-col items-center justify-center text-center gap-8">
        {isLoading ? (
          <Loader size="lg" />
        ) : (
          <svg
            viewBox={`0 0 ${status.type === "error" ? 512 : 640} 512`}
            className="size-16 fill-blue"
            aria-label={
              status.type === "error" ? "Error icon" : "Email Sent Icon"
            }
          >
            <path
              d={
                status.type === "error"
                  ? "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                  : "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176 0 384c0 35.3 28.7 64 64 64l296.2 0C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"
              }
            />
          </svg>
        )}

        <h2 className="text-3xl font-bold leading-tight">
          {status.type === "error"
            ? "Failed to send email"
            : "Please verify to activate your account"}
        </h2>

        <p className="text-lg text-black/60 -mt-4">{status.message}</p>

        {status.type === "error" && failedAttempts > 1 && (
          <p className="text-black/60 -mt-6">
            Please try again or re-login if the issue persists.
          </p>
        )}

        <Button style={2} size="lg" onClick={resendEmail} disabled={isLoading}>
          Resend
        </Button>
      </div>
    </>
  );
};

export default Verify;
