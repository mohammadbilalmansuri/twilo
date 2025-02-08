import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectCursor,
  selectIsPostsFetched,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { databaseService } from "../appwrite";
import { setPosts, removePost, updatePost } from "../store/feedSlice";
import { useNotification, useAuthState } from ".";

const usePostState = () => {
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const isPostsFetched = useSelector(selectIsPostsFetched);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { user } = useAuthState();

  // Fetch posts

  const fetchPosts = async (
    state,
    setState,
    { userId = null, limit = 20 } = {}
  ) => {
    if (state.loading || !state.hasMore) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await databaseService.getPosts({
        userId,
        limit,
        cursor,
      });

      if (response.total === 0) {
        setState((prev) => ({
          ...prev,
          hasMore: false,
          noPosts: true,
        }));
        return;
      }

      dispatch(setPosts(response.documents));

      setState((prev) => ({
        ...prev,
        hasMore: posts.length + response.documents.length < response.total,
        noPosts: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Fetch Single Post

  const fetchPost = async (id, setState, editing = false) => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      let post =
        posts.find((p) => p.$id === id) || (await databaseService.getPost(id));

      if (editing && post.owner.$id !== user.$id) {
        notify({
          type: "error",
          message: "You are not authorized to edit this post!",
        });
        navigate(`/post/${id}`);
        setState((prev) => ({ ...prev, loading: false }));
      }

      setState({
        loading: false,
        post,
        isOwner: post.owner.$id === user.$id,
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
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Delete Post

  const deletePost = async (post, setDeleting) => {
    setDeleting(true);
    try {
      await databaseService.deletePost(post.$id);
      if (post.thumbnail) {
        await storageService.deleteFile(post.thumbnail);
      }
      dispatch(removePost(post.$id));
      notify({
        type: "success",
        message: "Post deleted successfully!",
      });
      navigate("/feed");
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  return {
    posts,
    cursor,
    isPostsFetched,
    fetchPosts,
    fetchPost,
    deletePost,
  };
};

export default usePostState;
