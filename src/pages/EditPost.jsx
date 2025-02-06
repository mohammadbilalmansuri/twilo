import React, { useEffect } from "react";
import { PostForm, Loader } from "../components";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { usePostServices } from "../hooks";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, isOwner, loading, fetchPost } = usePostServices(id);

  useEffect(() => {
    if (id)
      fetchPost(id).then(() => {
        if (!post && loading !== null) {
          navigate("/posts");
        } else if (!isOwner) {
          navigate(`/post/${id}`);
        }
      });
  }, [id, fetchPost, post, loading, navigate]);

  if (loading) {
    return (
      <div className="max-w min-h relative flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  return post && isOwner ? (
    <>
      <Helmet>
        <title>Edit Post - {String(post?.title)} - Twilo</title>
      </Helmet>

      <div className="max-w relative py-8 flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-tight">Edit post</h2>
        <PostForm post={post} />
      </div>
    </>
  ) : null;
};

export default EditPost;
