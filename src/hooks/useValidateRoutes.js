import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from ".";

const useValidateRoutes = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isVerified } = useAuthState();
  const [validating, setValidating] = useState(true);

  const validateRoute = async (authentication, pathname) => {
    try {
      if (authentication) {
        if (!isLoggedIn) return navigate("/login", { replace: true });
        if (!isVerified && !["/verify", "/verification"].includes(pathname)) {
          return navigate("/verify", { replace: true });
        }
        if (isVerified && ["/verify", "/verification"].includes(pathname)) {
          return navigate("/feed", { replace: true });
        }
      } else {
        if (isLoggedIn && ["/", "/login", "/register"].includes(pathname)) {
          return navigate("/feed", { replace: true });
        }
      }
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setValidating(false);
    }
  };

  return { validateRoute, validating };
};

export default useValidateRoutes;
