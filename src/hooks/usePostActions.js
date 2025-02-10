import { useState } from "react";
import { createPost, updatePost, deletePost } from "../appwrite/database";
import { uploadFile, deleteFile } from "../appwrite/storage";
import { useNotification, useAuthState } from ".";
import { useNavigate } from "react-router-dom";
import { addPost, modifyPost, removePost } from "../store/profilesSlice";
import { useDispatch } from "react-redux";

const usePostActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { user } = useAuthState();
  const [loading, setLoading] = useState(false);

  const create = async ({ summary, content, thumbnail }) => {
    setLoading(true);
    try {
      const file = thumbnail.new ? await uploadFile(thumbnail.new) : null;

      const postData = {
        summary,
        content,
        thumbnail: file ? file.$id : "",
        owner: user?.$id,
      };

      const newPost = await createPost(postData);
      notify({ type: "success", message: "Post created successfully!" });
      dispatch(addPost(newPost));
      navigate(`/post/${newPost.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const update = async (post, { summary, content, thumbnail }) => {
    setLoading(true);
    try {
      const file = thumbnail.new ? await uploadFile(thumbnail.new) : null;

      const postData = {};
      if (summary !== post.summary) postData.summary = summary;
      if (content !== post.content) postData.content = content;

      if (thumbnail.old === null && post.thumbnail) {
        await storageService.deleteFile(post.thumbnail);
        postData.thumbnail = "";
      }

      if (file) postData.thumbnail = file.$id;

      if (Object.keys(postData).length === 0) {
        notify({ type: "error", message: "No changes detected!" });
        return;
      }

      const updatedPost = await updatePost(post.$id, postData);
      notify({ type: "success", message: "Post updated successfully!" });
      dispatch(modifyPost(updatedPost));
      navigate(`/post/${updatedPost.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (post) => {
    setLoading(true);
    try {
      await deletePost(post.$id);
      if (post.thumbnail) await deleteFile(post.thumbnail);
      notify({ type: "success", message: "Post deleted successfully!" });
      dispatch(removePost(post));
      navigate(`/profile/${user?.$id}`, { replace: true });
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
};

export default usePostActions;
