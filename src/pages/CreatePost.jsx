import { PostForm } from "../components";
import { Helmet } from "react-helmet-async";

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
      </Helmet>

      <div className="max-w relative py-8 flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-tight">Create new post</h2>
        <PostForm />
      </div>
    </>
  );
};

export default CreatePost;
