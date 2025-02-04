import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loader } from "./components";
import { useAuth } from "./hooks";

const App = () => {
  const { checkSession, checkingSession, sessionError } = useAuth();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Header />
      <main
        className={`w-full relative flex flex-col items-center px-4 min-h mt-16${
          checkingSession ? " justify-center gap-6" : ""
        }`}
      >
        {checkingSession ? <Loader /> : <Outlet />}
        {sessionError && <p className="text-lg">{sessionError}</p>}
      </main>
      <Footer />
    </>
  );
};
export default App;
