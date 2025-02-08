import { useState } from "react";
import { useDispatch } from "react-redux";
import { databaseService } from "../appwrite";
import { setPosts } from "../store/feedSlice";
import { useFeedState, useAuthState } from ".";

const useFeed = () => {
  const { user } = useAuthState();
  const { cursor, hasMore, total } = useFeedState();
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
        limit: 15,
        cursor,
      });
      dispatch(setPosts(postsData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchFeed, loading, error };
};

export default useFeed;
