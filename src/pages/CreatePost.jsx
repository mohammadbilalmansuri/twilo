import { Container, PostForm } from "../components";
import { Helmet } from "react-helmet-async";

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
      </Helmet>

      <Container
        parentTag="div"
        className="py-10 min-h flex flex-col items-center gap-4"
      >
        <h2 className="text-4xl font-bold leading-tight">Create a new post</h2>
        <PostForm />
      </Container>
    </>
  );
};

export default CreatePost;
