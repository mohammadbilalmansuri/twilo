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

  return {
    posts,
    cursor,
    fetchPosts,
  };
};

export default usePostState;
