import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { databaseService } from "../appwrite";
import { setPosts } from "../store/postSlice";
import usePostState from "./usePostState";

const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, cursor } = usePostState();
  const [state, setState] = useState({
    loading: false,
    error: null,
    hasMore: true,
    noPosts: false,
  });

  const fetch = useCallback(
    async ({ userId = null, limit = 20 } = {}) => {
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
    },
    [cursor, dispatch, state.hasMore, state.loading]
  );

  return {
    posts,
    state,
    fetch,
  };
};

export default usePosts;
