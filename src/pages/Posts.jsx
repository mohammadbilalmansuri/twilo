import { Helmet } from "react-helmet-async";
import { Loader, Button, PostMasonry } from "../components";
import { usePostServices, useIntersectionObserver } from "../hooks";
import { useEffect } from "react";

const Posts = () => {
  const { posts, postsState: state, fetchPosts } = usePostServices();
  const ref = useIntersectionObserver(() => {
    if (posts.length === 0 || state.hasMore) fetchPosts();
  });

  return (
    <>
      <Helmet>
        <title>Twilo - Write. Share. Explore. Connect.</title>
      </Helmet>

      {state.error ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center gap-4 text-center">
          <h3 className="text-3xl font-bold leading-normal">{state.error}</h3>
          <p className="text-lg text-black/60">
            Please try again or re-login if the issue persists
          </p>
        </div>
      ) : state.loading && posts?.length === 0 ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : state.noPosts ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center text-center gap-6">
          <h2 className="text-center text-4xl leading-tight font-bold">
            No posts available at the moment
          </h2>
          <h3 className="text-2xl max-w-md leading-tight text-black/60">
            Be the first to create one!
          </h3>
          <Button as="link" to="/create-post" size="lg" className="mt-2">
            Create Post
          </Button>
        </div>
      ) : (
        <div className="max-w relative pt-4 flex flex-col">
          <PostMasonry posts={posts} />

          {state.loading && (
            <div className="flex justify-center items-center py-6">
              <Loader />
            </div>
          )}

          {!state.hasMore && posts.length > 0 && (
            <p className="text-center text-black/60 text-lg py-6">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}

          {state.hasMore && (
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

export default Posts;
