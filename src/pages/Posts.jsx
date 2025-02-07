import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Loading, Loader, Button, PostMasonry } from "../components";
import { usePostServices, useIntersectionObserver } from "../hooks";

const Posts = () => {
  const { posts, fetchPosts } = usePostServices();
  const [state, setState] = useState({
    loading: false,
    error: null,
  });
  const ref = useIntersectionObserver(() => {
    if (posts.length === 0 || state.hasMore) fetchPosts(state, setState);
  });

  return (
    <>
      <Helmet>
        <title>Twilo - Write. Share. Explore. Connect.</title>
      </Helmet>

      {state.error ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-4xl font-bold leading-none">
            Unable to fetch posts!
          </h1>
          <p className="text-lg leading-tight text-black/60 max-w-screen-sm">
            {state.error}
          </p>
        </div>
      ) : state.loading && posts?.length === 0 ? (
        <Loading />
      ) : state.noPosts ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center text-center gap-8">
          <h1 className="text-4xl font-bold leading-none">
            No posts available at the moment
          </h1>
          <h3 className="text-2xl leading-tight text-black/60">
            Be the first to create one!
          </h3>
          <Button as="link" to="/create-post">
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
