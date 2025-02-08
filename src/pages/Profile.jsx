import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProfile, useIntersectionObserver } from "../hooks";
import { Loading, Loader, PostMasonry, Button, Input } from "../components";
import formatTime from "../utils/formatTime";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { id } = useParams();
  const { fetchProfile, fetchMorePosts, loading, loadingMore, profile } =
    useProfile(id);

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

  const ref = useIntersectionObserver(() => {
    if (profile?.hasMore) fetchMorePosts();
  });

  return loading && !profile ? (
    <Loading />
  ) : (
    <>
      <Helmet>
        <title>{profile?.name || "Profile"} - Twilo</title>
      </Helmet>

      <div className="wrapper py-4 gap-4">
        <div className="w-full border-1.5 border-black/10 rounded-lg p-4 flex gap-8 justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="size-24 rounded-lg bg-blue text-white font-zen-dots text-4xl flex items-center justify-center">
              {String(profile?.name || "User")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h1 className="text-2xl font-bold leading-tight">
                {profile?.name}
              </h1>
              <p className="text">@{profile?.$id}</p>
              {profile?.isCurrentUser && (
                <p className="text">{profile?.email}</p>
              )}
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-lg leading-none pr-4 border-r-2 border-black/20">
              {profile?.total} Posts
            </p>
            <p className="text-lg leading-none">
              Joined {formatTime(profile?.$createdAt)}
            </p>
          </div>
        </div>

        {!loading && profile?.total === 0 ? (
          <div className="wrapper-center text-center py-8 gap-4">
            <h1 className="h1">
              {profile?.isCurrentUser
                ? "You haven't created any post"
                : "User hasn't created any post"}
            </h1>
            {profile?.isCurrentUser && (
              <Button as="link" to="/create">
                Create Post
              </Button>
            )}
          </div>
        ) : (
          <div className="wrapper">
            <PostMasonry
              posts={Array.isArray(profile?.posts) ? profile.posts : []}
            />
            {loadingMore && profile?.hasMore && (
              <div className="flex flex-col items-center pt-4">
                <Loader />
              </div>
            )}
            {!profile?.hasMore && profile?.total !== 0 && (
              <p className="text text-center pt-4">
                You've reached the end of the posts.
              </p>
            )}
            {profile?.hasMore && (
              <div
                ref={ref}
                className="w-full 0 h-1 opacity- pointer-events-none"
              ></div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
