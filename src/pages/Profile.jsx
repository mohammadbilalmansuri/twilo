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

  const lastPostRef = useIntersectionObserver(() => {
    if (profile?.hasMore) fetchMorePosts();
  });

  return loading && !profile ? (
    <Loading />
  ) : (
    profile && (
      <>
        <Helmet>
          <title>{profile.name || "Profile"} - Twilo</title>
        </Helmet>

        <div className="wrapper lg:py-4 py-3 lg:gap-4 gap-3">
          <div className="w-full border-1.5 border-black/10 rounded-lg lg:p-4 p-3 flex sm:flex-row flex-col gap-4 sm:justify-between items-center">
            <div className="w-full flex sm:flex-row flex-col lg:gap-4 gap-3 sm:items-center">
              <div className="aspect-square sm:min-w-fit sm:size-24 size-16 rounded-lg bg-blue text-white font-zen-dots sm:text-4xl text-2xl leading-none flex items-center justify-center">
                {profile.name
                  ?.split(" ")
                  .filter((n) => n)
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase() || "U"}
              </div>

              <div className="sm:w-full flex sm:flex-row flex-col sm:justify-between sm:items-center sm:gap-4 gap-2">
                <div className="flex flex-col gap-2">
                  <h1 className="sm:text-2xl text-xl font-bold leading-tight">
                    {profile.name}
                  </h1>
                  <p className="sm:text-lg text-base leading-none text-blue">
                    @{profile.$id}
                  </p>
                  {profile?.isCurrentUser && (
                    <p className="sm:text-lg text-base leading-none">
                      {profile.email}
                    </p>
                  )}
                </div>

                <div className="flex sm:gap-4 gap-3 items-center">
                  {profile.total > 0 && (
                    <p className="sm:text-lg text-base leading-none sm:pr-4 pr-3 border-r-1.5 border-blue">
                      {profile.total} posts
                    </p>
                  )}
                  <p className="sm:text-lg text-base leading-none">
                    Joined {formatTime(profile?.$createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {profile.total === 0 ? (
            profile.isCurrentUser ? (
              <div className="max-w relative flex flex-col items-center text-center py-4 gap-6">
                <h1 className="sm:text-2xl text-xl font-semibold leading-tight text-black/60">
                  You haven't created any post
                </h1>
                <Button as="link" to="/create" style="secondary">
                  Create Post
                </Button>
              </div>
            ) : (
              <p className="sm:text-2xl text-xl font-semibold leading-tight text-center py-4 text-black/60">
                User hasn't created any post
              </p>
            )
          ) : (
            <div className="max-w relative flex flex-col items-center lg:gap-4 gap-3">
              <PostMasonry
                posts={profile.posts || []}
                page="profile"
                lastPostRef={lastPostRef}
              />

              {loadingMore && profile.hasMore && <Loader />}
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Profile;
