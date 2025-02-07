import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loading, Notification } from "./components";
import { useSession } from "./hooks";

const App = () => {
  const { checkSession, loading } = useSession();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full min-h relative flex flex-col items-center px-3 mt-16">
        {loading ? <Loading /> : <Outlet />}
        <Notification />
      </main>
      <Footer />
    </>
  );
};

export default App;
