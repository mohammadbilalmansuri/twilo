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

      <div className="max-w min-h-inherit relative flex flex-col items-center justify-center gap-4 text-center py-8">
        <h4 className="md:text-lg xs:text-base text-sm leading-tight border-b-1.5 border-b-black/10 pb-0.5">
          Start your blogging journey today with Twilo
        </h4>
        <h1 className="h1">Bring Your Stories and Ideas to Life</h1>
        <p className="text text-black/60 md:max-w-xl max-w-lg">
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
