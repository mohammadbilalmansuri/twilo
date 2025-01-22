import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, Button, PostCard } from "../components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const [isSorted, setIsSorted] = useState(true);

  const sortedPosts = useMemo(() => {
    return isSorted ? posts : [...posts].reverse();
  }, [posts, isSorted]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPagePosts = sortedPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const toggleSort = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
    setCurrentPage(1);
  };

  return (
    <Container className="py-10 flex flex-col items-center gap-5">
      {userData ? (
        posts?.length === 0 ? (
          <>
            <h1 className="text-4xl font-bold">There is nothing to show!</h1>
            <h2 className="text-2xl font-medium">Please create posts.</h2>
            <Link to="/create-post">
              <Button type="button">Create Post</Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">All Posts</h1>
              <div className="flex gap-5">
                {sortedPosts?.length > 1 && (
                  <Button type="button" onClick={toggleSort}>
                    {isSorted ? "See Oldest First" : "See Latest First"}
                  </Button>
                )}
                <Link to="/create-post">
                  <Button type="button">Create New Post</Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-7">
              {currentPagePosts?.map((post) => (
                <PostCard key={post?.$id} {...post} />
              ))}
            </div>
            {sortedPosts?.length > postsPerPage && (
              <div className="flex gap-3 justify-center items-center pt-5">
                {/* here "_" in the arrow function is used to ignore the value of array */}
                {Array.from(
                  { length: Math.ceil(posts.length / postsPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`h-8 w-8 text-lg leading-[0] rounded-md transition-all duration-200 ${
                        currentPage === index + 1
                          ? "bg-gray-600"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >
                      {index + 1}
                      {/* here "index + 1" because array index starts from 0 but we want
                    to start pagination from 1, thats why everywhere in this
                    button we are using "index + 1" */}
                    </button>
                  )
                )}
              </div>
            )}
          </>
        )
      ) : (
        <div className="text-center flex flex-col items-center gap-8">
          <h2 className="text-xl font-medium">
            Start your blogging journey today with Twilo
          </h2>
          <h1 className="text-5xl font-bold -mt-4">Write. Share. Connect.</h1>
          <p className="text-lg text-c4/75 max-w-lg">
            Twilo is your go-to platform for effortless blogging. Share your
            thoughts, ideas, and stories with a community of readers. Whether
            you're writing for fun or building an audience, Twilo makes it easy
            to get started and grow.
          </p>
          <Button style={1}>Get Started</Button>
        </div>
      )}
    </Container>
  );
}

export default Home;
