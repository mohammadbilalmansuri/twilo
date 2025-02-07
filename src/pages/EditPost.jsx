import { useEffect, useState } from "react";
import { PostForm, Loading } from "../components";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { usePostServices } from "../hooks";

const EditPost = () => {
  const { id } = useParams();
  const { fetchPost } = usePostServices();
  const [state, setState] = useState({
    loading: true,
    post: null,
    isOwner: false,
  });

  useEffect(() => {
    if (!id) return;
    fetchPost(id, setState, true);
  }, [id]);

  return state.loading ? (
    <Loading />
  ) : state.post && state.isOwner ? (
    <>
      <Helmet>
        <title>Edit Post - {state.post.title} - Twilo</title>
      </Helmet>

      <div className="max-w relative py-8 flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold leading-none">Edit post</h2>
        <PostForm post={state.post} />
      </div>
    </>
  ) : null;
};

export default EditPost;
