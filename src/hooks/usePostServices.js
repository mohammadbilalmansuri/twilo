import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, selectCursor } from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { databaseService } from "../appwrite";
import { setPosts } from "../store/postsSlice";
import { useNotification } from ".";

const usePostState = () => {
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [postsState, setPostsState] = useState({
    loading: false,
    error: null,
    hasMore: true,
    noPosts: false,
  });

  const fetchPosts = async ({ userId = null, limit = 20 } = {}) => {
    if (postsState.loading || !postsState.hasMore) return;

    setPostsState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await databaseService.getPosts({
        userId,
        limit,
        cursor,
      });

      if (response.total === 0) {
        setPostsState((prev) => ({
          ...prev,
          hasMore: false,
          noPosts: true,
        }));
        return;
      }

      dispatch(setPosts(response.documents));

      setPostsState((prev) => ({
        ...prev,
        hasMore: posts.length + response.documents.length < response.total,
        noPosts: false,
      }));
    } catch (error) {
      setPostsState((prev) => ({ ...prev, error: error.message }));
    } finally {
      setPostsState((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    posts,
    cursor,
    postsState,
    fetchPosts,
  };
};

export default usePostState;
