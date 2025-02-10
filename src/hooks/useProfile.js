import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getUserPosts } from "../appwrite/database";
import { addProfile, updateProfile } from "../store/profilesSlice";
import { selectProfiles } from "../store/selectors";
import { useAuthState, useNotification } from ".";

const useProfile = (userId) => {
  const dispatch = useDispatch();
  const { user } = useAuthState();
  const { notify } = useNotification();
  const profiles = useSelector(selectProfiles);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const profile = profiles.find((p) => p.$id === userId) || null;

  const fetchProfile = async () => {
    if (!userId || profile) return;
    setLoading(true);
    try {
      const [newProfile, posts] = await Promise.all([
        getProfile(userId),
        getUserPosts({
          userId,
          limit: 20,
          cursor: null,
        }),
      ]);

      const profileWithPosts = {
        ...newProfile,
        isCurrentUser: user?.$id === newProfile.$id,
        posts: posts.documents,
        total: posts.total,
        hasMore: posts.documents.length < posts.total,
        cursor: posts.documents.length
          ? posts.documents[posts.documents.length - 1].$id
          : null,
      };

      dispatch(addProfile(profileWithPosts));
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePosts = async () => {
    if (!profile || !profile.hasMore || !profile.cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const posts = await getUserPosts({
        userId,
        limit: 20,
        cursor: profile.cursor,
      });

      const updatedProfile = {
        ...profile,
        posts: [...profile.posts, ...posts.documents],
        total: posts.total,
        cursor: posts.documents.length
          ? posts.documents[posts.documents.length - 1].$id
          : profile.cursor,
        hasMore: profile.posts.length + posts.documents.length < posts.total,
      };

      dispatch(updateProfile(updatedProfile));
    } catch (error) {
      notify({ type: "error", message: error.message });
    } finally {
      setLoadingMore(false);
    }
  };

  return { fetchProfile, fetchMorePosts, loading, loadingMore, profile };
};

export default useProfile;
