import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { databaseService } from "../appwrite";
import { useFeedState, useAuthState, useNotification } from ".";
import { selectProfiles } from "../store/selectors";

const usePost = () => {
  const { user } = useAuthState();
  const { posts } = useFeedState();
  const profilesPosts = useSelector(selectProfiles)
    ?.map((profile) => profile.posts)
    .flat();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = async (id, editing = false) => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let fetchedPost =
        posts.find((p) => p.$id === id) ||
        profilesPosts.find((p) => p.$id === id);

      if (!fetchedPost) {
        fetchedPost = await databaseService.getPost(id);
      }

      const postWithOwner = {
        ...fetchedPost,
        isOwner: user.$id === fetchedPost.owner.$id,
      };

      setPost(postWithOwner);

      if (editing && !postWithOwner.isOwner) {
        notify({
          type: "error",
          message: "You are not authorized to edit this post!",
        });
        navigate(`/post/${id}`);
        return;
      }
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

export default usePost;
