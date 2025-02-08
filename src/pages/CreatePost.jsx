import { PostForm } from "../components";
import { Helmet } from "react-helmet-async";

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
      </Helmet>

      <div className="wrapper gap-7 py-8">
        <h2 className="h1">Create new post</h2>
        <PostForm />
      </div>
    </>
  );
};

export default CreatePost;
