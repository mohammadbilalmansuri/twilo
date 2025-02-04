import { Button } from "../components";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <div className="max-w min-h relative flex flex-col items-center justify-center">
        <div className="w-full relative py-8 flex flex-col items-center gap-8 text-center">
          <h2 className="text-8xl font-zen-dots text-blue tracking-wider">
            4O4
          </h2>
          <h3 className="text-4xl font-bold leading-tight">
            Opps! Page Not Found
          </h3>
          <Button style={2} size="lg" as="link" to="/" className="mt-4">
            Go To Home
          </Button>
        </div>
      </div>
    </>
  );
};
