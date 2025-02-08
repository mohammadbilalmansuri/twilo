import { Helmet } from "react-helmet-async";
import { Loading, Loader, Button, PostMasonry } from "../components";
import { useIntersectionObserver, useFeedState, useFeed } from "../hooks";
import { useEffect } from "react";

const Feed = () => {
  const { posts, hasMore, total } = useFeedState();
  const { fetchFeed, loading, error } = useFeed();

  useEffect(() => {
    fetchFeed();
  }, []);

  const ref = useIntersectionObserver(() => {
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
        <div className="wrapper-center text-center py-8 gap-4">
          <h1 className="h1">Unable to fetch posts</h1>
          <p className="text max-w-xl">{error}</p>
        </div>
      ) : !loading && total === 0 ? (
        <div className="wrapper-center text-center py-8 gap-4">
          <h1 className="h1">No posts available at the moment</h1>
          <h3 className="text text-2xl pb-2">Be the first to create one!</h3>
          <Button as="link" to="/create">
            Create Post
          </Button>
        </div>
      ) : (
        <div className="wrapper pt-4">
          <PostMasonry posts={posts} />
          {loading && hasMore && (
            <div className="flex flex-col items-center py-6">
              <Loader />
            </div>
          )}
          {!hasMore && total !== 0 && (
            <p className="text text-center py-6">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}
          {hasMore && (
            <div
              ref={ref}
              className="w-full 0 h-1 opacity- pointer-events-none"
            ></div>
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
