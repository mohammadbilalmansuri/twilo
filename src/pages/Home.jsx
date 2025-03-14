import { Button } from "../components";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Twilo: Bring Your Stories and Ideas to Life</title>
        <meta
          name="description"
          content="Twilo is your go-to platform for easy blogging. Share your stories, ideas, and creativity with a lively community of readers. Whether you're writing for fun, exploring new ideas, or growing your audience, Twilo makes it easy to succeed."
        />
      </Helmet>

      <div className="max-w my-auto relative flex flex-col items-center justify-center gap-4 text-center py-4">
        <h4 className="sm:text-lg xs:text-base text-sm leading-snug border-b-1.5 border-b-black/10">
          Start your blogging journey today with Twilo
        </h4>
        <h1 className="h1 sm:max-w-full max-w-xs">
          Bring Your Stories and Ideas to Life
        </h1>
        <p className="text text-black/60 sm:max-w-xl max-w-sm">
          Twilo is your go-to platform for easy blogging. Share your stories,
          ideas, and creativity with a lively community of readers. Whether
          you're writing for fun, exploring new ideas, or growing your audience,
          Twilo makes it easy to succeed.
        </p>
        <Button as="link" to="/signup" className="mt-2">
          Get Started
        </Button>
      </div>
    </>
  );
};

export default Home;
