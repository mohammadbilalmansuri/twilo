import React, { useState, useEffect } from "react";
import { Header, Footer, Loader } from "./components";
import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLoggedIn) await getUser();
      } catch (error) {
        if (error.message === "User (role: guests) missing scope (account)") {
          alert("Session expired. Please login again.");
          dispatch(logout());
          navigate("/login");
        } else {
          alert(error.message);
        }
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
      <main
        className={`w-full relative flex flex-col items-center px-3 min-h mt-16${
          loading ? " justify-center" : ""
        }`}
      >
        {loading ? <Loader /> : <Outlet />}
      </main>
      <Footer />
    </>
  );
}
export default App;
