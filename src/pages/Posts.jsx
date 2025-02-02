import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";
import { databaseService } from "../appwrite";
import { setPosts } from "../store/postSlice";
import { PostCard, Loader, Button } from "../components";
import Masonry from "react-masonry-css";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const cursor = useSelector((state) => state.post.cursor);
  const [state, setState] = useState({
    loading: false,
    hasMore: true,
    noPosts: false,
  });
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  const fetchPosts = useCallback(async () => {
    if (!state.hasMore || state.loading) return;
    setState((prevState) => ({ ...prevState, loading: true }));

    try {
      const response = await databaseService.getPosts(10, cursor);
      if (response.documents.length > 0) {
        dispatch(setPosts([...posts, ...response.documents]));
      } else {
        setState((prevState) => ({
          ...prevState,
          hasMore: false,
          noPosts: response.total === 0,
        }));
      }
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch posts", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [cursor, dispatch, posts, state.hasMore, state.loading]);

  useEffect(() => {
    if (posts.length === 0 || (inView && state.hasMore)) fetchPosts();
  }, [inView, fetchPosts, posts.length, state.hasMore]);

  return (
    <>
      <Helmet>
        <title>Twilo - Write. Share. Explore. Connect.</title>
      </Helmet>

      {error ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center gap-4 text-center">
          <h3 className="text-3xl font-semibold leading-normal">{error}</h3>
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
        <div className="max-w relative pt-4 pb-6 flex flex-col gap-6">
          <Masonry
            breakpointCols={{ default: 2, 660: 1 }}
            className="w-full relative grid gap-4 sm:grid-cols-2 grid-cols-1"
            columnClassName="masonry-column"
          >
            {posts.length > 0 &&
              posts.map((post, index) => {
                if (index === posts.length - 1) {
                  return <PostCard ref={ref} key={post.$id} {...post} />;
                } else {
                  return <PostCard key={post.$id} {...post} />;
                }
              })}
          </Masonry>

          {state.loading && (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )}

          {!state.hasMore && posts.length > 0 && (
            <p className="text-center text-black/60 text-lg">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Posts;
