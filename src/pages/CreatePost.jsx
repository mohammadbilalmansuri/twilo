import { PostForm } from "../components";
import { Helmet } from "react-helmet-async";

const CreatePost = () => {
  return (
    <>
      <Helmet>
        <title>Create New Post - Twilo</title>
        <meta name="description" content="Create a new post on Twilo" />
      </Helmet>

      <div className="max-w relative flex flex-col items-center lg:py-4 py-3">
        <PostForm />
      </div>
    </>
  );
};

export default CreatePost;
