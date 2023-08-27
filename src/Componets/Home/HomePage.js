import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token.length  ) {
     
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <LoginPage></LoginPage>
    </div>
  );
};

export default HomePage;
