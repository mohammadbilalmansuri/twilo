import { useEffect, useState } from "react";
import { PostCard } from ".";

const PostMasonry = ({ posts, page = "feed", lastPostRef }) => {
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const handleMediaQueryChange = (event) => setIsWideScreen(event.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const lastPostId = posts?.[posts.length - 1]?.$id;
  const oddPosts = posts?.filter((_, index) => index % 2 !== 0);
  const evenPosts = posts?.filter((_, index) => index % 2 === 0);

  return (
    posts && (
      <div className="w-full relative grid lg:gap-4 gap-3 sm:grid-cols-2 grid-cols-1">
        {isWideScreen ? (
          <>
            <div className="flex flex-col lg:gap-4 gap-3">
              {evenPosts.map((post) => (
                <PostCard
                  key={post.$id}
                  {...post}
                  page={page}
                  ref={post.$id === lastPostId ? lastPostRef : null}
                />
              ))}
            </div>
            <div className="flex flex-col lg:gap-4 gap-3">
              {oddPosts.map((post) => (
                <PostCard
                  key={post.$id}
                  {...post}
                  page={page}
                  ref={post.$id === lastPostId ? lastPostRef : null}
                />
              ))}
            </div>
          </>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.$id}
              {...post}
              page={page}
              ref={post.$id === lastPostId ? lastPostRef : null}
            />
          ))
        )}
      </div>
    )
  );
};

export default PostMasonry;
