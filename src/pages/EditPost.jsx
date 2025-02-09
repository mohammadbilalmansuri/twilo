import { useEffect } from "react";
import { PostForm, Loading } from "../components";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks";

const EditPost = () => {
  const { id } = useParams();
  const { fetchPost, loading, post } = usePost();

  useEffect(() => {
    fetchPost(id, true);
  }, [id]);

  return loading ? (
    <Loading />
  ) : post && post.isOwner ? (
    <>
      <Helmet>
        <title>Edit Post - {post.title} - Twilo</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="max-w min-h-inherit relative flex flex-col items-center lg:py-4 py-3">
        <PostForm post={post} />
      </div>
    </>
  ) : null;
};

export default EditPost;
