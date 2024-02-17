import React, { useState, useEffect } from "react";
import "../stylings/TeacherDashboard.css";
import { Link } from "react-router-dom";
import AuthHOC from "../components/Authentication/AuthHOC";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkPendings, getUserData } from "../services/user.services";
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isApproved, setIsApproved] = useState(false);
  const [checkPending, setCheckPending] = useState(false);
  useEffect(() => {
    checkPendingQuestionare();
    checkIsApproved();
  }, []);

  const checkIsApproved = async () => {
    try {
      const user = await getUserData();
      if (!user) {
        console.error("User ID not found in localStorage");
        return;
      } else {
        setIsApproved(user.isApproved);
      }
    } catch (error) {
      console.error("Error while checking approval status:", error);
    }
  };
  const handleLogout = () => {
    localStorage.setItem("isSignedIn", JSON.stringify(false));
    navigate("/");
    toast("logout successfull");
  };
  const checkPendingQuestionare = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const teacherId = user._id;
      const response = await checkPendings(teacherId);
      console.log("response of pending sttatus:", response.data.hasPendingExam);
      setCheckPending(response.data.hasPendingExam);
    } catch (error) {
      console.error("error while check pending questionare", error);
    }
  };
  return (
    <div className="teacher-dashboard">
      <button className="logout-button" onClick={() => handleLogout()}>
        Logout
      </button>
      <h1>Teacher Dashboard</h1>
      {!isApproved ? (
        <p className="status-message">
          Wait while admin approves your sign request
        </p>
      ) : (
        <>
          {checkPending ? (
            <p className="status-message">
              Wait for your previous questionnaire to be approved.
            </p>
          ) : (
            <Link className="dashboard-link" to={"/questionare"}>
              Create Questionnaire
            </Link>
          )}
          <Link className="dashboard-link" to={"/add"}>
            Add Question To My Subject
          </Link>
          <Link className="dashboard-link" to={"/results"}>
            Check results of all students
          </Link>
          <Link className="dashboard-link" to={"/subjectcreate"}>
            Create subject
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthHOC(TeacherDashboard);
