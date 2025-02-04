import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { PostCard, Loader, Button } from "../components";
import Masonry from "react-masonry-css";
import usePosts from "../hooks/usePosts";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const Posts = () => {
  const { posts, fetchPosts, state } = usePosts();
  const ref = useIntersectionObserver(
    () => {
      if (posts.length === 0 || state.hasMore) fetchPosts();
    },
    { threshold: 0.5 }
  );

  return (
    <>
      <Helmet>
        <title>Twilo - Write. Share. Explore. Connect.</title>
      </Helmet>

      {state.error ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center gap-4 text-center">
          <h3 className="text-3xl font-semibold leading-normal">
            {state.error}
          </h3>
          <p className="text-lg text-black/60">
            Please try again or re-login if the issue persists
          </p>
        </div>
      ) : state.loading && posts.length === 0 ? (
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
        <div className="max-w relative py-4 flex flex-col">
          <Masonry
            breakpointCols={{ default: 2, 660: 1 }}
            className="w-full relative grid gap-4 sm:grid-cols-2 grid-cols-1"
            columnClassName="masonry-column"
          >
            {posts.length > 0 &&
              posts.map((post) => <PostCard key={post.$id} {...post} />)}
          </Masonry>

          {state.loading && (
            <div className="flex justify-center items-center pt-6">
              <Loader />
            </div>
          )}

          {!state.hasMore && posts.length > 0 && (
            <p className="text-center text-black/60 text-lg pt-6">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}

          <div
            ref={ref}
            className="opacity-0 h-2 w-full relative pointer-events-none"
          ></div>
        </div>
      )}
    </>
  );
};

export default Posts;
