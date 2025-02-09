import { Helmet } from "react-helmet-async";
import { Loading, Loader, Button, PostMasonry } from "../components";
import { useIntersectionObserver, useFeed } from "../hooks";
import { useEffect } from "react";

const Feed = () => {
  const { posts, hasMore, total, fetchFeed, loading, error } = useFeed();

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

      {loading && posts.length === 0 ? (
        <Loading />
      ) : error ? (
        <div className="max-w min-h-inherit relative flex flex-col items-center justify-center text-center py-8 gap-4">
          <h1 className="h1">Unable to fetch posts</h1>
          <p className="text text-black/60 sm:max-w-xl max-w-lg">{error}</p>
        </div>
      ) : !loading && total === 0 ? (
        <div className="max-w min-h-inherit relative flex flex-col items-center justify-center text-center py-8 gap-4">
          <h1 className="h1">No posts available at the moment</h1>
          <h3 className="sm:text-2xl text-xl text-black/60 pb-1">
            Be the first to create one!
          </h3>
          <Button as="link" to="/create">
            Create Post
          </Button>
        </div>
      ) : (
        <div className="max-w min-h-inherit relative flex flex-col items-center lg:py-4 py-3 lg:gap-4 gap-3">
          <PostMasonry
            posts={Array.isArray(posts) ? posts : []}
            lastPostRef={lastPostRef}
          />

          {loading && hasMore && <Loader size="md" />}

          {!hasMore && total !== 0 && (
            <p className="text text-black/60 text-center">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
