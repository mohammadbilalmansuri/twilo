import { useSelector } from "react-redux";
import {
  selectIsPostsFetched,
  selectPosts,
  selectCursor,
  selectHasMore,
  selectTotalPosts,
} from "../store/selectors";

const usePostState = () => {
  const isPostsFetched = useSelector(selectIsPostsFetched);
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const hasMore = useSelector(selectHasMore);
  const totalPosts = useSelector(selectTotalPosts);

  return { isPostsFetched, posts, cursor, hasMore, totalPosts };
};

export default usePostState;
