import React, { useState } from "react";
import { useEffect } from "react";
import "../stylings/TeacherDashboard.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import QuestionFormReuse from "../components/Teacher/QuestionFormReuse";
import { useNavigate } from "react-router-dom";
import * as questionare from "./../services/questionare.services";
import { getUserData } from "../services/user.services";

const QuestionareCreate = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [numberCarry, setNumberCarry] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [ans, setAns] = useState("");

  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  useEffect(() => {
    fetchSubjects();
  }, []);
  const fetchSubjects = async () => {
    try {
      const user = await getUserData();
      // console.log(userId);
      const teacherId = user._id;
      const response = await questionare.noQuestionare(teacherId);

      console.log("the response of all subject is: ", response);
      setAllSubjects(response.data.subjects);
      if (response.data.subjects.length === 0) {
        toast("In order to create Questionare, First add Subject");
        navigate("/teacherdashboard");
      }
      //   console.log("here is the subjects", response.data.name);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };
  const handleSubjectChange = (event) => {
    console.log(event.target.value);
    setSubject(event.target.value);
  };
  const handleAnsChange = (event) => {
    setAns(event.target.value);
  };
  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };
  const handleNewNumberCarry = (event) => {
    setNumberCarry(event.target.value);
  };
  const handleOptionChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = event.target.value;
    setOptions(updatedOptions);
  };
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };
  const handleCheckboxChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].isCorrect = event.target.checked;
    setOptions(updatedOptions);
  };

  const handleAddQuestion = (currentType) => {
    let newQuestionData;
    if (currentType === "MCQ") {
      if (options === "" || newQuestion === "" || numberCarry === "") {
        toast.error("Please fill in all the required fields.");
        return;
      }
      if (isNaN(Number(numberCarry))) {
        toast.error("Number of each question must be a valid number.");
        return;
      }
      const newOptions = options.map((option) => ({
        text: option.text.trim(),
        isCorrect: option.isCorrect,
      }));

      newQuestionData = {
        questionType: "MCQ",
        text: newQuestion.trim(),
        subjectId: subject,
        numberCarry: Number(numberCarry),
        options: newOptions.filter((option) => option.text !== ""),
      };
    } else {
      if (ans === "" || newQuestion === "" || numberCarry === "") {
        toast.error("Please fill in all the required fields.");
        return;
      }
      if (isNaN(Number(numberCarry))) {
        toast.error("Number of each question must be a valid number.");
        return;
      }
      newQuestionData = {
        questionType: "Text",
        text: newQuestion.trim(),
        subjectId: subject,
        numberCarry: Number(numberCarry),
        answer: ans,
      };
    }
    setQuestions([...questions, newQuestionData]);
    setNumberCarry(1);
    setNewQuestion("");
    setAns("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  const handleCreateQuestionnaire = async () => {
    console.log(subject);
    if (subject === "") {
      toast("Add subject first to create questionare");
      return;
    }
    if (
      endTime !== null &&
      startTime !== null &&
      endTime > startTime &&
      questions !== null
    ) {
      try {
        console.log(questions, "questions");
        console.log(startTime, endTime, subject);
        const user = await getUserData();
        const response = await questionare.createQuestion(questions, subject);
        if (response) {
          console.log({
            teacher: user._id,
            subjectId: subject,
            startTime: startTime,
            endTime: endTime,
          });
          const response = await questionare.createQuestionare(
            user,
            subject,
            startTime,
            endTime
          );
          if (response) {
            toast("questionare created successfully");
            navigate("/teacherdashboard");
          }
        }
      } catch (error) {
        console.error("Error creating questions:", error);
      }
    } else {
      toast(
        "Invalid Start and end time or you have not added question. Please check again."
      );
    }
    setEndTime(null);
    setStartTime(null);
  };
  return (
    <div className="teacher-dashboard">
      <div className="questionnaire">
        {allSubjects.length > 0 ? (
          <div className="subject-select">
            <label className="question-label">Select Subject:</label>
            <select className="select-dropdown" onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              {allSubjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Loading subjects...</p>
        )}
        <QuestionFormReuse
          newQuestion={newQuestion}
          handleNewQuestionChange={handleNewQuestionChange}
          numberCarry={numberCarry}
          handleNewNumberCarry={handleNewNumberCarry}
          options={options}
          handleOptionChange={handleOptionChange}
          handleCheckboxChange={handleCheckboxChange}
          handleAddQuestion={handleAddQuestion}
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
          answer={ans}
          handleAnswer={handleAnsChange}
        />
        <label>
          Enter Start Time of this questionnaire:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
            className="input-field"
          />
        </label>
        <br />
        <label>
          Enter End Time of this questionnaire:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            required
            className="input-field"
          />
        </label>
        <button onClick={handleCreateQuestionnaire} className="submit-button">
          Create this questionnaire
        </button>
      </div>
    </div>
  );
};

export default QuestionareCreate;
