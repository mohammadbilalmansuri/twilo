import { Helmet } from "react-helmet-async";
import { Button, Loader } from "../components";
import { useVerify } from "../hooks";

const Verify = () => {
  const { resendVerificationEmail, resending } = useVerify();

  return (
    <>
      <Helmet>
        <title>Verify - Twilo</title>
        <meta
          name="description"
          content="Verify your email to continue using Twilo"
        />
      </Helmet>

      <div className="max-w min-h-inherit relative flex flex-col items-center justify-center py-8 text-center gap-4">
        <svg viewBox="0 0 640 512" className="sm:h-16 h-14 mb-1 fill-blue">
          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0l57.4-43c23.9-59.8 79.7-103.3 146.3-109.8l13.9-10.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176 0 384c0 35.3 28.7 64 64 64l296.2 0C335.1 417.6 320 378.5 320 336c0-5.6 .3-11.1 .8-16.6l-26.4 19.8zM640 336a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 353.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z" />
        </svg>
        <h1 className="h1">Verify your email to continue</h1>
        <p className="text text-black/60 pb-2">
          Check your email for the verification link.
        </p>
        <Button
          style="secondary"
          onClick={resendVerificationEmail}
          disabled={resending}
        >
          {resending ? <Loader size="sm" /> : "Resend"}
        </Button>
      </div>
    </>
  );
};

export default Verify;
