import React, { useState, useEffect } from "react";
import "../stylings/StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthHOC from "../components/Authentication/AuthHOC";
import { examQuestionares } from "../services/exam.services";
import {
  uploadImage,
  setQuestionareId,
  getUserData,
} from "../services/user.services";
const StudentDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [questionares, SetQuestionares] = useState([]);
  const navigate = useNavigate();

  const AllQuestionares = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData").trim());
      const studentId = user._id;
      console.log(studentId);
      const response = await examQuestionares(studentId);
      console.log(response);
      SetQuestionares(response.data.validQuestionares);
      if (response.status === 201) {
        console.log("successfully displayed the Questionares");
      }
    } catch (error) {
      console.error("error while getting the questionares", error);
    }
  };

  const startExam = async (questionare) => {
    let date = new Date();
    // console.log("date", date);
    const startDate = new Date(questionare.startTime);
    const endDate = new Date(questionare.endTime);

    // console.log(date < startDate, date > endDate, date, startDate, endDate);
    if (date < startDate) {
      toast("Exam has not been started yet");
    } else if (date > endDate) {
      toast("Exam time is finished");
    } else {
      setQuestionareId(questionare);
      navigate("/startexam");
    }
  };

  useEffect(() => {
    const user = getUserData();
    if (user.profilePicture) {
      setImageFile(user.profilePicture);
    }
    AllQuestionares();
  }, []);
  const handleLogout = () => {
    localStorage.setItem("isSignedIn", JSON.stringify(false));
    navigate("/");
    toast("logout successfull");
  };

  const handleFileChange = async (event) => {
    console.log("File change");
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = async () => {
    // const userId = await getUserData();
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response2 = await uploadImage(formData);

      setImageFile(response2.data.user.profilePicture);

      console.log("Image URL saved in backend:", response2);

      console.log("Image successfully uploaded and saved");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="questionnaire-list">
      <div>
        <img
          alt="profile pic"
          src={imageFile}
          height={"100"}
          width={"100"}
          style={{
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      </div>
      <button onClick={() => handleLogout()}>logout</button>
      {questionares.map((questionare, index) => (
        <div key={index} className="questionnaire-item">
          <div className="questionnaire-details">
            <span className="subject">{questionare.subject.name}</span>
            <span className="time">
              <strong>Start time:</strong>{" "}
              {moment(questionare.startTime).format("MMMM Do YYYY, h:mm a")}
              <br />
              <strong>End time:</strong>{" "}
              {moment(questionare.endTime).format("MMMM Do YYYY, h:mm a")}
            </span>
          </div>
          <button
            className="start-button"
            onClick={() => startExam(questionare)}
          >
            Start Exam
          </button>
        </div>
      ))}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileSubmit}>Upload Profile Picture</button>
      </div>
    </div>
  );
};

export default AuthHOC(StudentDashboard);
