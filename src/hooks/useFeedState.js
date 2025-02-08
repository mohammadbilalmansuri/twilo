import { useSelector } from "react-redux";
import {
  selectPosts,
  selectCursor,
  selectHasMore,
  selectTotalPosts,
} from "../store/selectors";

const usePostState = () => {
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const hasMore = useSelector(selectHasMore);
  const totalPosts = useSelector(selectTotalPosts);

  return { posts, cursor, hasMore, totalPosts };
};

export default usePostState;
