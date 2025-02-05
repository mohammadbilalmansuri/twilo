import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectPosts, selectCursor } from "../store/selectors";

const usePostState = () => {
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const fetched = useMemo(() => posts.length > 0, [posts]);

  return {
    fetched,
    posts,
    cursor,
  };
};

export default usePostState;
