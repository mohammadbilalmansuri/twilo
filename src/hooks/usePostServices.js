import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  selectCursor,
  selectIsPostsFetched,
} from "../store/selectors";
import { useNavigate } from "react-router-dom";
import { databaseService } from "../appwrite";
import { setPosts, removePost, updatePost } from "../store/feedSlice";
import { useNotification, useAuthState } from ".";

const usePostState = () => {
  const posts = useSelector(selectPosts);
  const cursor = useSelector(selectCursor);
  const isPostsFetched = useSelector(selectIsPostsFetched);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { user } = useAuthState();

  // Delete Post

  return {
    posts,
    cursor,
    isPostsFetched,
    fetchPosts,
    fetchPost,
    deletePost,
  };
};

export default usePostState;
