import { useState, useEffect } from "react";
import { databaseService } from "../appwrite";
import { usePostsState, useAuth } from ".";

const usePost = (id) => {
  return { post, isOwner };
};

export default usePost;
