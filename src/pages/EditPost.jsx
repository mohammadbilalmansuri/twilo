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

      <div className="wrapper gap-8 py-8">
        <h2 className="h1">Edit post</h2>
        <PostForm post={post} />
      </div>
    </>
  ) : null;
};

export default EditPost;
