import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import databaseService from "./appwrite/database";
import { login } from "./store/authSlice";
import { setPosts } from "./store/postSlice";
import { setUsers } from "./store/userSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) {
          const [userData, allPosts, allUsers] = await Promise.all([
            authService.getCurrentUser(),
            databaseService.getPosts(),
            databaseService.getUsers(),
          ]);

          if (userData) {
            allPosts && dispatch(setPosts(allPosts.documents));
            dispatch(login(userData));
            allUsers && dispatch(setUsers(allUsers.documents));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return !loading ? (
    <>
      <Header />
      <main className="w-full relative border-x border-x-secondary/25 border-dashed max-w-screen-lg min-h-[calc(100vh-126px)] flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;
