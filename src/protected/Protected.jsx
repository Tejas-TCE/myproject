import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("Loginpag");
    if (!isLoggedIn) {
      navigate("/Loginpag"); // Redirect to Login page if not logged in
    }
  });

  return <Component />; // Render the Component if logged in
};

export default Protected;
