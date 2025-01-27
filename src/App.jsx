import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { databaseService } from "./appwrite";
import { setPosts } from "./store/postSlice";
import { setUsers } from "./store/userSlice";
import { Header, Footer, Loader } from "./components";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const dispatch = useDispatch();
  const { isLoggedIn, getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          await getUser();

          // const [allPosts, allUsers] = await Promise.all([
          //   databaseService.getPosts(),
          //   databaseService.getUsers(),
          // ]);
          // allPosts && dispatch(setPosts(allPosts.documents));
          // allUsers && dispatch(setUsers(allUsers.documents));
        }
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div className="w-full min-h flex flex-col items-center justify-center">
          <Loader />
        </div>
      ) : (
        <main className="w-full relative flex flex-col items-center">
          {error ? (
            <div className="w-full max-w-[700px] min-h flex flex-col gap-4 items-center text-center justify-center">
              <h4 className="text-2xl font-medium">{error}</h4>
              <p className="text-lg text-secondary/75">
                Please try again or re-login if the issue persists.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      )}
      <Footer />
    </>
  );
}
export default App;
