import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "./components";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, SetLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if (authStatus === true) {
    //   navigate("/")
    // } else if (authStatus === false) {
    //   navigate("/login")
    // }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    SetLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="w-full h-full">
      <Container className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700">Loading...</h1>
      </Container>
    </div>
  ) : (
    <>{children}</>
  );
}
