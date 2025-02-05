import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loader, Notification } from "./components";
import { useAuth, useNotification } from "./hooks";

const App = () => {
  const { checkSession, session } = useAuth();
  const { open } = useNotification();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (session.error) open(session.error);
  }, [session.error]);

  return (
    <>
      <Header />
      <main className="w-full relative flex flex-col items-center px-4 min-h mt-16">
        {session.loading ? (
          <div className="max-w min-h relative flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
      <Notification />
    </>
  );
};

export default App;
