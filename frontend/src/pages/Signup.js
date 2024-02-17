import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Authentication/AuthForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signup } from "../services/user.services";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const userTypes = ["student", "teacher", "admin"];
  const loginFields = [
    {
      name: "name",
      type: "text",
      label: "name",
    },
    {
      name: "email",
      type: "email",
      label: "email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
  ];
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      user_type: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.user_type) {
        errors.password = "User type is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setloading(true);
      const { name, email, password, user_type } = values;

      try {
        const response = await signup(name, email, password, user_type);
        if (response) {
          toast("signup successful");
          navigate("/");
        } else {
          toast("signup was not successful");
          console.log("Signup failed. Server error.");
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast("user already exist ");
        } else {
          console.log("Signup failed. Server error.", error);
        }
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
          <h1>Signup</h1>
          <br />
          <form className="forms" onSubmit={formik.handleSubmit}>
            <AuthForm
              formik={formik}
              fields={loginFields}
              buttonText="submit"
              loading={loading}
            />
            <div className="SingleCredential">
              <select
                className="fields"
                name="user_type"
                value={formik.values.user_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select User Type</option>
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formik.touched.user_type && formik.errors.user_type && (
                <div className="error">{formik.errors.user_type}</div>
              )}
            </div>
            <br />
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
