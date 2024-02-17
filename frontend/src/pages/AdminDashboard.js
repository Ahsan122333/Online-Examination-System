import React, { useState, useEffect } from "react";
import "../stylings/admin.css";
import AuthHOC from "../components/Authentication/AuthHOC";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as admin from "./../services/admin.services";
import AuthForm from "../components/Authentication/AuthForm";
import { useFormik } from "formik";
import { adminRegister } from "../services/user.services";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [pendingQuestionare, setPendingQuestionare] = useState([]);
  const [approvedQuestionares, setApprovedQuestionares] = useState([]);
  const [loading, setloading] = useState(false);
  const userTypes = ["student", "teacher"];
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
        const response = await adminRegister(name, email, password, user_type);
        if (response) {
          toast("user Registered successfully");
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

  const fetchPendingTeachers = async () => {
    try {
      const response = await admin.pendingTeachers();
      console.log({ response });
      setPendingTeachers(response.data);
    } catch (error) {
      console.log("Error fetching pending teachers:", error);
    }
  };
  const AllQuestionares = async () => {
    try {
      const response = await admin.Questionares();
      console.log("response:", response);
      setApprovedQuestionares(response.data);
      if (response.status === 200) {
        console.log("successfully displayed the Questionares");
      }
    } catch (error) {
      console.error("error while submitting the questions", error);
    }
  };
  const fetchPendingQuestionare = async () => {
    try {
      const response = await admin.pendingQuestionares();
      console.log(response.data);
      setPendingQuestionare(response.data);
    } catch (error) {
      console.log("Error fetching pending Questionare:", error);
    }
  };

  const approveTeacher = async (email) => {
    try {
      const response = await admin.approveTeacher(email);
      console.log("Teacher approved:", response);
      fetchPendingTeachers();
    } catch (error) {
      console.log("Error approving teacher:", error);
    }
  };

  const approveQuestionare = async (id) => {
    try {
      const response = await admin.approveQuestionare(id);
      console.log("asdasfdf", response.questionares);
      setApprovedQuestionares(response.data.questionares);
      fetchPendingQuestionare();
    } catch (error) {
      console.log("Error approving questionare:", error);
    }
    AllQuestionares();
  };
  const deleteQuestionare = async (id) => {
    try {
      console.log("id in delete:", id);
      const response = await admin.deleteQuestionare(id);
      if (response.status === 400) {
        console.log("cannot delete the question as the exam is started");
      } else {
        console.log("Questionare Deleted:", response);
      }
    } catch (error) {
      console.log("Error while deleting questionare:", error);
    }
    AllQuestionares();
  };
  const checkAdminRole = () => {
    setIsAdmin(true);
  };
  const handleLogout = () => {
    localStorage.setItem("isSignedIn", JSON.stringify(false));
    navigate("/");
    toast("logout successfull");
  };
  useEffect(() => {
    fetchPendingTeachers();
    checkAdminRole();
    fetchPendingQuestionare();
    AllQuestionares();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <button className="logout-button" onClick={() => handleLogout()}>
        Logout
      </button>

      {isAdmin && (
        <div className="admin-section">
          <div className="pending-teachers-section">
            <h2 className="section-title">Teachers Pending Approval</h2>
            {pendingTeachers.length > 0 ? (
              <ul className="teacher-list">
                {pendingTeachers.map((teacher) => (
                  <li key={teacher._id} className="teacher-item">
                    <div className="teacher-details">
                      <strong>Name:</strong> {teacher.name}
                      <br />
                      <strong>Email:</strong> {teacher.email}
                      <br />
                      <strong>User Type:</strong> {teacher.user_type}
                    </div>
                    <button
                      className="approve-button"
                      onClick={() => approveTeacher(teacher.email)}
                    >
                      Approve Teacher
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending teachers found.</p>
            )}
          </div>

          <div className="pending-questionnaires-section">
            <h2 className="section-title">Questionnaires Pending Approval</h2>
            {pendingQuestionare.length > 0 ? (
              <ul className="questionnaire-list">
                {pendingQuestionare.map((questionare) => (
                  <li key={questionare._id} className="questionnaire-item">
                    <div className="questionnaire-details">
                      <strong>Subject Name:</strong> {questionare.subject.name}
                      <br />
                      <strong>Teacher Email:</strong>{" "}
                      {questionare.teacher.email}
                    </div>
                    <button
                      className="approve-button"
                      onClick={() => approveQuestionare(questionare._id)}
                    >
                      Approve Questionnaire
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending questionnaires found.</p>
            )}
          </div>

          <div className="approved-questionnaires-section">
            <h2 className="section-title">Approved Questionnaires</h2>
            {approvedQuestionares.length > 0 ? (
              <ul className="questionnaire-list">
                {approvedQuestionares.map((approvedQuestionare) => (
                  <li
                    key={approvedQuestionare._id}
                    className="questionnaire-item"
                  >
                    <div className="questionnaire-details">
                      <strong>Subject Name:</strong>{" "}
                      {approvedQuestionare.subject.name}
                      <br />
                      <strong>Teacher Email:</strong>{" "}
                      {approvedQuestionare.teacher.email}
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => deleteQuestionare(approvedQuestionare._id)}
                    >
                      Delete Questionnaire
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No approved questionnaires found.</p>
            )}
          </div>
        </div>
      )}

      <Link className="results-link" to={"/results"}>
        Check results of all students
      </Link>
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
  );
};

export default AuthHOC(AdminDashboard);
