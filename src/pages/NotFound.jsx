import { Container, Button } from "../components";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <Container
        parentTag="div"
        parentClasses="min-h justify-center"
        className="py-10 flex flex-col items-center gap-8 text-center"
      >
        <h2 className="text-8xl font-zen-dots text-blue tracking-wider">4O4</h2>
        <h1 className="text-4xl font-bold leading-tight">
          Opps! Page Not Found
        </h1>
        <Button
          style={2}
          padding="md"
          fontSize="lg"
          as="link"
          to="/"
          className="mt-4"
        >
          Go To Home
        </Button>
      </Container>
    </>
  );
}
