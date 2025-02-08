import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { databaseService } from "../appwrite";
import { addProfile, setCurrentUserPosts } from "../store/profilesSlice";
import {
  selectIsCurrentUserPostsFetched,
  selectCurrentUserPosts,
  selectProfiles,
} from "../store/selectors";
import { useAuthState, useNotification } from ".";

const useProfile = () => {
  const dispatch = useDispatch();
  const { user } = useAuthState();
  const profiles = useSelector(selectProfiles);
  const currentUserPosts = useSelector(selectCurrentUserPosts);
  const isCurrentUserPostsFetched = useSelector(
    selectIsCurrentUserPostsFetched
  );
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (userId) => {
    if (!userId) return;

    setLoading(true);
    try {
      let profileData;

      if (userId === user.$id) {
        if (isCurrentUserPostsFetched && currentUserPosts?.length) {
          profileData = {
            ...user,
            isCurrentUser: true,
            posts: currentUserPosts,
          };
        } else {
          const posts = await databaseService.getPostByUser(userId);
          dispatch(setCurrentUserPosts(posts));
          profileData = { ...user, isCurrentUser: true, posts };
        }
      } else {
        let profile = profiles.find((p) => p.$id === userId);

        if (!profile) {
          profile = await databaseService.getProfile(userId);
          dispatch(addProfile(profile));
        }

        profileData = { ...profile, isCurrentUser: false };
      }

      setProfile(profileData);
    } catch (err) {
      notify({ type: "error", message: err.message });
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchProfile, loading, profile };
};

export default useProfile;
