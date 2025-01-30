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
        alert("Session expired. Please login again.");
        dispatch(logout());
        navigate("/login");
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
          <Outlet />
        </main>
      )}
      <Footer />
    </>
  );
}
export default App;
