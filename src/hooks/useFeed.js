import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPosts,
  selectCursor,
  selectHasMore,
  selectTotalPosts,
} from "../store/selectors";
import { databaseService } from "../appwrite";
import { setPosts } from "../store/feedSlice";
import { useAuthState } from ".";

const useFeed = () => {
  const { user } = useAuthState();
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const hasMore = useSelector(selectHasMore);
  const total = useSelector(selectTotalPosts);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeed = async () => {
    if (!hasMore && total !== 0) return;
    setLoading(true);
    setError(null);
    try {
      const postsData = await databaseService.getFeed({
        userId: user?.$id,
        limit: 20,
        cursor,
      });
      dispatch(setPosts(postsData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { posts, hasMore, total, fetchFeed, loading, error };
};

export default useFeed;
