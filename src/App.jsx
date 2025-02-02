import React, { useState, useEffect } from "react";
import { Header, Footer, Loader } from "./components";
import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, getUser } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      try {
        await getUser();
      } catch (error) {
        if (error.message === "User (role: guests) missing scope (account)") {
          alert("Session expired, logging out...");
          dispatch(logout());
          navigate("/login", { replace: true });
        } else {
          console.error("Error fetching user:", error);
          alert(
            "An error occurred while fetching user data. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <>
      <Header />
      <main
        className={`w-full relative flex flex-col items-center px-4 min-h mt-16${
          loading ? " justify-center" : ""
        }`}
      >
        {loading ? <Loader /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
};
export default App;
