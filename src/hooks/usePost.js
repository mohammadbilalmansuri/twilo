import { useState } from "react";
import { databaseService } from "../appwrite";
import { useFeedState, useAuthState } from ".";

const useFeed = () => {
  const { user } = useAuthState();
  const { posts } = useFeedState();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = async (id, editing = false) => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let post =
        posts.find((p) => p.$id === id) || (await databaseService.getPost(id));

      if (editing && post.owner.$id !== user.$id) {
        notify({
          type: "error",
          message: "You are not authorized to edit this post!",
        });
        navigate(`/post/${id}`);
        return;
      }

      setPost({
        ...post,
        isOwner: true,
      });
    } catch (err) {
      notify({
        type: "error",
        message:
          err.message === "Document with the requested ID could not be found."
            ? "Post not found!"
            : err.message,
      });
      navigate("/feed", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return { fetchPost, loading, post };
};

export default useFeed;
