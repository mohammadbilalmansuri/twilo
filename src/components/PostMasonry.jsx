import { useEffect, useState } from "react";
import { PostCard } from "../components";

const PostMasonry = ({ posts }) => {
  const [isWideScreen, setIsWideScreen] = useState(
    window.matchMedia("(min-width: 640px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const handleMediaQueryChange = (event) => setIsWideScreen(event.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const oddPosts = posts.filter((_, index) => index % 2 !== 0);
  const evenPosts = posts.filter((_, index) => index % 2 === 0);

  return (
    <div className="w-full relative grid gap-4 sm:grid-cols-2 grid-cols-1">
      {isWideScreen ? (
        <>
          <div className="flex flex-col gap-4">
            {evenPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {oddPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostMasonry;
