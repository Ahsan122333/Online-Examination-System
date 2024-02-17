import React, { useState } from "react";
import "./../stylings/TeacherDashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createSubject } from "../services/subject.services";
import { getUserData } from "../services/user.services";

const SubjectCreate = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");

  const handleSubjectSubmit = async () => {
    if (subject === "") {
      toast.error("please enter the subject field.");
      return;
    }

    try {
      const user = await getUserData();
      const response = await createSubject(subject, user);
      console.log(response, "sub resp");

      setSubject(response._id);
      if (response) {
        console.log("subject created successfully");
        navigate("/teacherdashboard");
      }
    } catch (error) {
      toast.error("Subject Already Exists");
      console.error("error while creating subject", error);
    }
  };
  return (
    <div className="teacher-dashboard">
      <div className="questionnaire">
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="input-field"
          />
          <button onClick={handleSubjectSubmit} className="submit-button">
            Submit Subject
          </button>
        </div>
      </div>
    </div>
  );
};
export default SubjectCreate;
