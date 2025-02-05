import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Loader } from "./components";
import { useAuth } from "./hooks";

const Protect = ({ children, authentication = true }) => {
  const location = useLocation();
  const { checkAuth } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth(authentication, location).then(() => setChecking(false));
  }, [authentication, checkAuth, location]);

  if (checking) {
    return (
      <div className="max-w relative min-h flex items-center justify-center ddfgdfg">
        <Loader />
      </div>
    );
  }

  return children;
};

export default Protect;
