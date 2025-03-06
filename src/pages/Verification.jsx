import { useSearchParams } from "react-router-dom";
import { Loader, Button } from "../components";
import { Helmet } from "react-helmet-async";
import { useVerify } from "../hooks";

const Verification = () => {
  const { verify, verifying } = useVerify();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  return (
    <>
      <Helmet>
        <title>Email Verification - Twilo</title>
        <meta name="description" content="Verify your email to continue" />
      </Helmet>

      <div className="max-w my-auto relative flex flex-col items-center justify-center py-4 text-center gap-8">
        <h1 className="h1 xs:max-w-full max-w-xs">
          Click below to verify your email
        </h1>

        <Button onClick={() => verify(userId, secret)} disabled={verifying}>
          {verifying ? <Loader size="sm" color="white" /> : "Verify Email"}
        </Button>
      </div>
    </>
  );
};

export default Verification;
