import { useState } from "react";
import { databaseService, storageService } from "../appwrite";
import { useNotification, useAuthState } from ".";
import { useNavigate } from "react-router-dom";
import { addPost, updatePost, removePost } from "../store/profilesSlice";
import { useDispatch, useSelector } from "react-redux";

const usePostActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { user } = useAuthState();
  const [loading, setLoading] = useState(false);

  const createPost = async ({ title, excerpt, content, thumbnail }) => {
    setLoading(true);
    try {
      const file = thumbnail.new
        ? await storageService.uploadFile(thumbnail.new)
        : null;

      const postData = {
        title,
        excerpt,
        content,
        thumbnail: file ? file.$id : "",
        owner: user.$id,
      };

      const newPost = await databaseService.createPost(postData);

      notify({ type: "success", message: "Post created successfully!" });
      dispatch(addPost(newPost));
      navigate(`/post/${newPost.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const updatePostData = async (
    post,
    { title, excerpt, content, thumbnail }
  ) => {
    setLoading(true);
    try {
      const file = thumbnail.new
        ? await storageService.uploadFile(thumbnail.new)
        : null;

      const postData = {};
      if (title !== post.title) postData.title = title;
      if (excerpt !== post.excerpt) postData.excerpt = excerpt;
      if (content !== post.content) postData.content = content;

      if (thumbnail.old === null && post.thumbnail) {
        await storageService.deleteFile(post.thumbnail);
        postData.thumbnail = "";
      }

      if (file) postData.thumbnail = file.$id;

      const updatedPost = await databaseService.updatePost(post.$id, postData);

      notify({ type: "success", message: "Post updated successfully!" });
      dispatch(updatePost(updatedPost));
      navigate(`/post/${updatedPost.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (post) => {
    setLoading(true);
    try {
      await databaseService.deletePost(post.$id);
      if (post.thumbnail) await storageService.deleteFile(post.thumbnail);

      notify({ type: "success", message: "Post deleted successfully!" });
      dispatch(removePost(post));
      navigate(`/profile/${user.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return { createPost, updatePostData, deletePost, loading };
};

export default usePostActions;
