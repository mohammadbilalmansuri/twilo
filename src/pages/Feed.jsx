import { Helmet } from "react-helmet-async";
import { Loading, Loader, PostMasonry } from "../components";
import { useIntersectionObserver, useFeed } from "../hooks";
import { useEffect } from "react";

const Feed = () => {
  const { posts, hasMore, total, fetchFeed, loading } = useFeed();

  useEffect(() => {
    fetchFeed();
  }, []);

  const lastPostRef = useIntersectionObserver(() => {
    if (hasMore) fetchFeed();
  });

  return (
    <>
      <Helmet>
        <title>Twilo: Bring Your Stories and Ideas to Life</title>
        <meta
          name="description"
          content="Twilo is your go-to platform for easy blogging. Share your stories, ideas, and creativity with a lively community of readers. Whether you're writing for fun, exploring new ideas, or growing your audience, Twilo makes it easy to succeed."
        />
      </Helmet>

      {loading && total === 0 ? (
        <Loading />
      ) : !loading && total === 0 ? (
        <p className="max-w my-auto sm:text-2xl text-xl font-semibold leading-tight text-center py-4 text-black/60">
          No posts available in the feed at the moment.
        </p>
      ) : (
        posts && (
          <div className="max-w relative flex flex-col items-center lg:py-4 py-3 lg:gap-4 gap-3">
            <PostMasonry posts={posts} page="feed" lastPostRef={lastPostRef} />

            {loading && hasMore && <Loader size="md" />}
          </div>
        )
      )}
    </>
  );
};

export default Feed;
