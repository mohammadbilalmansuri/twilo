import { Button } from "../components";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../hooks";

const NotFound = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="max-w min-h relative flex flex-col items-center justify-center">
        <div className="w-full relative py-8 flex flex-col items-center gap-8 text-center">
          <h1 className=" leading-none text-8xl font-zen-dots text-blue tracking-wider">
            4O4
          </h1>
          <h2 className="text-4xl font-bold leading-none">
            Opps! Page Not Found
          </h2>
          <Button
            style={2}
            as="link"
            to={isLoggedIn ? "/posts" : "/"}
            className="mt-4"
          >
            Go To Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
