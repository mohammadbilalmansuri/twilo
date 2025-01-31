import { Container, PostForm } from "../components";
import { Helmet } from "react-helmet-async";

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
      </Helmet>

      <Container className="py-8 min-h flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-tight">Create a new post</h2>

        <PostForm />
      </Container>
    </>
  );
};

export default CreatePost;
