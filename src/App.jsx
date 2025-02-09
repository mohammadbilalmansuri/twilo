import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, Loading, Notification } from "./components";
import { useSession } from "./hooks";

const App = () => {
  const { checkSession, checking } = useSession();

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full flex-grow relative flex flex-col items-center lg:px-4 px-3 sm:mt-[57.333px] mt-[53.333px]">
        {checking ? <Loading /> : <Outlet />}
        <Notification />
      </main>
      <Footer />
    </>
  );
};

export default App;
