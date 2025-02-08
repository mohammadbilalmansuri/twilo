import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../hooks";
import { Loading, PostMasonry } from "../components";
import formatTime from "../utils/formatTime";

const Profile = () => {
  const { id } = useParams();
  const { fetchProfile, loading, profile } = useProfile();

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    profile && (
      <div className="wrapper py-4 gap-4">
        <div className="w-full border-1.5 border-black/10 rounded-lg p-4 flex gap-8 justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl font-bold leading-tight">
                {profile.name}
              </h1>
              {profile.isCurrentUser && (
                <p className="text -mt-1">{profile.email}</p>
              )}
            </div>
          </div>
          <div>
            <p className="text">Joined {formatTime(profile.$createdAt)}</p>
          </div>
        </div>
        <div className="w-full relative">
          <PostMasonry posts={profile.posts} />
        </div>
      </div>
    )
  );
};

export default Profile;
