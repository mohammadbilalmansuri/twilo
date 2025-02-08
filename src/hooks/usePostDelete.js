import { useState } from "react";
import { databaseService } from "../appwrite";

const useFeed = () => {
  const [deleting, setDeleting] = useState(false);

  const deletePost = async (post) => {
    setDeleting(true);
    try {
      await databaseService.deletePost(post.$id);
      if (post.thumbnail) await storageService.deleteFile(post.thumbnail);
      notify({
        type: "success",
        message: "Post deleted successfully!",
      });
      navigate("/feed", { replace: true });
    } catch (error) {
      notify({
        type: "error",
        message: error.message,
      });
    } finally {
      setDeleting(false);
    }
  };

  return { deletePost, deleting };
};

export default useFeed;
