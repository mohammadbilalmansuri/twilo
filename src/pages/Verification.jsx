import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../components";
import { Helmet } from "react-helmet-async";
import { useVerify } from "../hooks";

const Verification = () => {
  const { verify } = useVerify();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    verify(userId, secret);
  }, [userId, secret]);

  return (
    <>
      <Helmet>
        <title>Email Verification - Twilo</title>
        <meta name="description" content="Verifying your email address" />
      </Helmet>

      <Loading />
    </>
  );
};

export default Verification;
