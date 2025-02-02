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
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [noPosts, setNoPosts] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

  const fetchPosts = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const response = await databaseService.getPosts(10, cursor);
      if (response.documents.length > 0) {
        dispatch(setPosts([...posts, ...response.documents]));
        setCursor(response.documents[response.documents.length - 1].$id);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      alert(
        `${error.message} | Please try again or re-login if the issue persists`
      );
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading, posts, dispatch]);

  // Initial fetch
  useEffect(() => {
    if (posts.length === 0) fetchPosts();
    if (posts.length === 0 && !loading && !hasMore) setNoPosts(true);
  }, []);

  // Fetch more when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore) fetchPosts();
  }, [inView, hasMore]);

  return (
    <>
      <Helmet>
        <title>Twilo - Write. Share. Explore. Connect.</title>
      </Helmet>

      {loading && posts.length === 0 ? (
        <div className="max-w min-h relative py-4 flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : noPosts ? (
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
            className="w-full relative grid gap-4 sm:grid-cols-2 grid-cols-1"
            columnClassName="masonry-column"
          >
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </Masonry>

          {loading && (
            <div className="flex justify-center items-center pt-6">
              <Loader />
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <p className="text-center text-black/60 text-lg pt-6">
              You've reached the end of the posts. Stay tuned for more updates!
            </p>
          )}

          <div ref={ref} className="h-2"></div>
        </div>
      )}
    </>
  );
};

export default Posts;
