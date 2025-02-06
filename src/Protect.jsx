import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "./components";
import { useAuth } from "./hooks";

const Protect = ({ children, authentication = true }) => {
  const { pathname } = useLocation();
  const { checkAuth } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      await checkAuth(authentication, pathname);
      await new Promise((resolve) => setTimeout(resolve, 50));
      setChecking(false);
    })();
  }, [pathname]);

  return checking ? <Loading /> : children;
};

export default Protect;
