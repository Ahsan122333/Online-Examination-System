import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Authentication/AuthForm";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { login, setUserData, setUserId } from "../services/user.services";

const AuthPage = () => {
  useEffect(() => {
    localStorage.setItem("isSignedIn", JSON.stringify(false));
  }, []);

  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const loginFields = [
    {
      name: "email",
      type: "email",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setloading(true);
      const { email, password } = values;

      try {
        const response = await login(email, password);
        if (response) {
          console.log(response.data);
          const userId = response.data.user._id;
          const user = response.data.user;
          setUserData(user);
          localStorage.setItem("isSignedIn", JSON.stringify(true));
          setUserId(userId);
          const token = response.data.token;
          localStorage.setItem("token", token);
          toast("Signin Successful!");
          const userType = user.user_type;

          console.log(userType);

          if (userType === "admin") {
            navigate("/admindashboard");
          } else if (userType === "teacher") {
            navigate("/teacherdashboard");
          } else if (userType === "student") {
            navigate("/studentdashboard");
          }
          // navigate("/");
        } else {
          console.log("Login failed. Please check your credentials.");
        }
      } catch (error) {
        if (error.response.status === 404) {
          toast("Login failed. Please check your credentials.");
        }
        console.log("Login failed. Server error.", error);
      } finally {
        setloading(false);
      }
    },
  });

  return (
    <div className="main">
      <div className="left-side"></div>
      <div className="right-side">
        <div className="inside">
          <h1>Login</h1>
          <br />
          <AuthForm
            formik={formik}
            fields={loginFields}
            buttonText="Login"
            loading={loading}
          />
          <div>
            <h2>{`Don't have an account? Click on signup`}</h2>
          </div>
          <Link
            className="button"
            to="/signup"
            style={{
              textDecoration: "none",
              paddingLeft: "150px",
              paddingTop: "15px",
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
