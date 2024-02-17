import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AuthHOC = (Component) => {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const userType = user.user_type;
      const isAuthenticated = JSON.parse(localStorage.getItem("isSignedIn"));
      console.log("userrrrr", user);
      console.log("user Typppe", userType);
      if (isAuthenticated === false) {
        navigate("/");
      } else if (isAuthenticated === true && userType === "admin") {
        navigate("/admindashboard");
      } else if (isAuthenticated === true && userType === "student") {
        navigate("/studentdashboard");
      } else if (isAuthenticated === true && userType === "teacher") {
        navigate("/teacherdashboard");
      }
    }, [navigate]);

    return <Component {...props} />;
  };
};

export default AuthHOC;
