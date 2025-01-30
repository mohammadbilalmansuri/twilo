import { Container, Button } from "../components";

function Home() {
  return (
    <Container
      parentTag="div"
      parentClasses="min-h justify-center"
      className="py-8 flex flex-col items-center gap-6 text-center"
    >
      <h2 className="text-xl leading-tight border-b border-b-black/20 pb-0.5">
        Start your blogging journey today with Twilo
      </h2>
      <h1 className="text-4xl font-bold leading-tight">
        Write. Share. Explore. Connect.
      </h1>
      <p className="text-lg text-black/60 max-w-screen-sm">
        Twilo is your go-to platform for effortless blogging. Share your
        thoughts, ideas, and stories with a community of readers. Whether you're
        writing for fun or building an audience, Twilo makes it easy to get
        started and grow.
      </p>
      <Button style={1} size="lg" as="link" to="/signup" className="mt-2">
        Get Started
      </Button>
    </Container>
  );
}

export default Home;
