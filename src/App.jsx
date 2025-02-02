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
  const [error, setError] = useState(null);
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
        setError("Session expired, logging out...");
        dispatch(logout());
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/login", { replace: true });
        n;
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
          loading ? " justify-center gap-6" : ""
        }`}
      >
        {loading ? <Loader /> : <Outlet />}
        {error && <p className="text-lg">{error}</p>}
      </main>
      <Footer />
    </>
  );
};
export default App;
