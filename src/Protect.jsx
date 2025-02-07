import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "./components";
import { useValidateRoutes } from "./hooks";

const Protect = ({ children, authentication = true }) => {
  const { pathname } = useLocation();
  const { validateRoute, validating } = useValidateRoutes();

  useEffect(() => {
    validateRoute(authentication, pathname);
  }, [pathname]);

  return validating ? <Loading /> : children;
};

export default Protect;
