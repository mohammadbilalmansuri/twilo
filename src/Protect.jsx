import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "./components";
import { useAuth } from "./hooks";

const Protect = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, isVerified } = useAuth();

  useEffect(() => {
    if (authentication) {
      if (!isLoggedIn) {
        navigate("/login", { replace: true, state: { from: location } });
        return;
      }

      if (isVerified) {
        if (["/verify", "/verify-email"].includes(location.pathname)) {
          navigate("/posts", { replace: true });
        }
      } else if (!["/verify", "/verify-email"].includes(location.pathname)) {
        navigate("/verify", { replace: true });
      }
    } else if (isLoggedIn) {
      navigate("/posts", { replace: true });
    }
    setLoading(false);
  }, [authentication, isLoggedIn, isVerified, location.pathname, navigate]);

  return loading ? (
    <div className="max-w relative min-h flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    children
  );
};

export default Protect;
