import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import { databaseService } from "../appwrite";
import { useAuth } from ".";
import { setPosts } from "../store/postSlice";

const usePosts = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useAuth();
  const { posts, cursor } = useSelector((state) => ({
    posts: state.post.posts,
    cursor: state.post.cursor,
  }));

  const [postsState, setPostsState] = useState({
    loading: false,
    hasMore: true,
    noPosts: false,
    error: null,
  });

  const fetchPosts = useCallback(
    async ({ userId = null, limit = 20 } = {}) => {
      if (!isLoggedIn || !postsState.hasMore || postsState.loading) return;
      setPostsState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await databaseService.getPosts({
          userId,
          limit,
          cursor,
        });

        setPostsState((prev) => ({
          ...prev,
          hasMore: posts.length < response.total,
          noPosts: response.total === 0,
        }));

        if (response.documents.length > 0) {
          dispatch(setPosts([...posts, ...response.documents]));
        }
      } catch (error) {
        setPostsState((prev) => ({ ...prev, error: error.message }));
        throw error;
      } finally {
        setPostsState((prev) => ({ ...prev, loading: false }));
      }
    },
    [
      isLoggedIn,
      postsState.hasMore,
      postsState.loading,
      cursor,
      dispatch,
      posts,
    ]
  );

  const [postState, setPostState] = useState({
    loading: false,
    error: null,
    isOwner: false,
  });

  const getPost = useCallback(
    async (id) => {
      if (!isLoggedIn) return;
      setPostState((prev) => ({ ...prev, loading: true }));

      try {
        const post = posts.find((post) => post.$id === id);
        if (post) {
          setPostState((prev) => ({
            ...prev,
            isOwner: post.owner.$id === userData.$id,
          }));
          return post;
        }

        const fetchedPost = await databaseService.getPost(id);
        setPostState((prev) => ({
          ...prev,
          isOwner: fetchedPost.owner.$id === userData.$id,
        }));
        return fetchedPost;
      } catch (error) {
        setPostState((prev) => ({ ...prev, error: error.message }));
        throw error;
      } finally {
        setPostState((prev) => ({ ...prev, loading: false }));
      }
    },
    [posts, isLoggedIn, userData]
  );

  const isPostsFetched = useMemo(() => posts.length > 0, [posts]);

  return {
    isPostsFetched,
    posts,
    cursor,
    fetchPosts,
    postsState,
    getPost,
    postState,
  };
};

export default usePosts;
