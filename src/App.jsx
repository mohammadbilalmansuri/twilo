import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loading, Notification } from "./components";
import { useAuth } from "./hooks";

const App = () => {
  const { checkSession } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      await checkSession();
      setChecking(false);
    })();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full min-h relative flex flex-col items-center px-4 mt-16">
        {checking ? <Loading /> : <Outlet />}
        <Notification />
      </main>
      <Footer />
    </>
  );
};

export default App;
