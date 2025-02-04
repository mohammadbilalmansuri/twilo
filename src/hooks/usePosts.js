import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { databaseService } from "../appwrite";
import useAuth from "./useAuth";
import { setPosts } from "../store/postSlice";

const usePosts = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useAuth();

  const isPostSFetched = useSelector((state) => state.post.cursor !== null);
  const posts = useSelector((state) => state.post.posts);
  const cursor = useSelector((state) => state.post.cursor);

  const [state, setState] = useState({
    loading: false,
    hasMore: true,
    noPosts: false,
    error: null,
  });

  const fetchPosts = useCallback(
    async ({ userId = null, limit = 20 } = {}) => {
      if (!isLoggedIn || !state.hasMore || state.loading) return;
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await databaseService.getPosts({
          userId,
          limit,
          cursor,
        });

        setState((prev) => ({
          ...prev,
          hasMore: posts.length < response.total,
          noPosts: response.total === 0,
        }));

        if (response.documents.length > 0) {
          dispatch(setPosts([...posts, ...response.documents]));
        }
      } catch (error) {
        setState((prev) => ({ ...prev, error: error.message }));
        throw error;
      } finally {
        console.log("Setting loading to false");
        setState((prev) => ({ ...prev, loading: false }));
        console.log(state.loading);
      }
    },
    [isLoggedIn, state.hasMore, state.loading, cursor, dispatch, posts]
  );

  const fetchPost = useCallback(
    async (id) => {
      if (!isLoggedIn) return null;

      const post = posts.find((post) => post.$id === id);
      if (post) return post;

      try {
        return await databaseService.getPost(id);
      } catch (error) {
        throw error;
      }
    },
    [posts, isLoggedIn]
  );

  const isPostAuthor = useCallback(
    (post) => (post && userData ? post.owner.$id === userData.$id : false),
    [userData]
  );

  return {
    isPostSFetched,
    posts,
    cursor,
    fetchPost,
    fetchPosts,
    state,
    isPostAuthor,
  };
};

export default usePosts;
